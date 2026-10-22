const CAPACITY = 200;
const ITEMS = new Map([
  ['milk/dark chocolate sea salt', 1], ['chocolate sea salt', 1],
  ['maple fudge & pecan', 1], ['butter fudge', 1],
  ['choose your three', 3], ['three-cookie pack', 3],
  ['the mixed six', 6], ['mixed six', 6]
]);
let cached;

export function summarize(orders, payments, { location, start, end, now }) {
  const paid = new Map();
  for (const payment of payments) {
    if (payment.status !== 'COMPLETED' || payment.location_id !== location || !payment.order_id) continue;
    const money = payment.amount_money;
    if (money?.currency !== 'CAD' || !Number.isSafeInteger(money.amount) || money.amount < 0) throw new Error('Invalid payment');
    paid.set(payment.order_id, (paid.get(payment.order_id) ?? 0) + money.amount);
  }
  let sold = 0;
  const seen = new Set();
  for (const order of orders) {
    if (seen.has(order.id)) continue;
    seen.add(order.id);
    const created = Date.parse(order.created_at);
    if (order.location_id !== location || order.state === 'CANCELED' ||
        !Number.isFinite(created) || created < Date.parse(start) || created >= Date.parse(end)) continue;
    const total = order.net_amounts?.total_money ?? order.total_money;
    if (!paid.has(order.id)) continue;
    if (total?.currency !== 'CAD' || !Number.isSafeInteger(total.amount) || total.amount < 0) throw new Error('Invalid order');
    if (paid.get(order.id) < total.amount) continue;
    if (!Array.isArray(order.line_items) || !order.line_items.length) throw new Error('Missing order items');
    for (const item of order.line_items) {
      const units = ITEMS.get(String(item.name).trim().toLowerCase());
      const quantity = Number(item.quantity);
      // Unknown products must be reviewed rather than silently overstating remaining stock.
      if (!units || !Number.isSafeInteger(quantity) || quantity <= 0) throw new Error('Unrecognized cookie item');
      sold += units * quantity;
    }
  }
  if (!Number.isSafeInteger(sold)) throw new Error('Invalid count');
  return { capacity: CAPACITY, remaining: Math.max(0, CAPACITY - sold), confirmedCookies: sold, updatedAt: now };
}

async function square(path, env, body) {
  const response = await fetch('https://connect.squareup.com/v2/' + path, {
    method: body ? 'POST' : 'GET',
    headers: { Authorization: 'Bearer ' + env.SQUARE_ACCESS_TOKEN, 'Square-Version': '2026-09-16', 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(8000)
  });
  if (!response.ok) throw new Error('Square unavailable');
  const result = await response.json();
  if (result.errors?.length) throw new Error('Square error');
  return result;
}

async function readStock(env) {
  const now = new Date().toISOString();
  const end = new Date(Math.min(Date.now(), Date.parse(env.DROP_END))).toISOString();
  const orders = [], payments = [];
  let cursor;
  for (let page = 0; page < 10; page++) {
    const result = await square('orders/search', env, {
      location_ids: [env.SQUARE_LOCATION_ID], limit: 1000, return_entries: false,
      query: { filter: { date_time_filter: { created_at: { start_at: env.DROP_START, end_at: end } } } },
      ...(cursor ? { cursor } : {})
    });
    orders.push(...(result.orders ?? []));
    cursor = result.cursor;
    if (!cursor) break;
    if (page === 9) throw new Error('Too many orders');
  }
  cursor = undefined;
  for (let page = 0; page < 10; page++) {
    const params = new URLSearchParams({ location_id: env.SQUARE_LOCATION_ID, begin_time: env.DROP_START, end_time: end, limit: '100' });
    if (cursor) params.set('cursor', cursor);
    const result = await square('payments?' + params, env);
    payments.push(...(result.payments ?? []));
    cursor = result.cursor;
    if (!cursor) break;
    if (page === 9) throw new Error('Too many payments');
  }
  return summarize(orders, payments, { location: env.SQUARE_LOCATION_ID, start: env.DROP_START, end: env.DROP_END, now });
}

const PRODUCTS = {
  chocolate: { name: 'Milk/Dark Chocolate Sea Salt', cents: 600, cookies: 1 },
  maple: { name: 'Maple Fudge & Pecan', cents: 600, cookies: 1 },
  butter: { name: 'Butter Fudge', cents: 600, cookies: 1 },
  three: { name: 'Choose your three', cents: 2100, cookies: 3, flavours: 3 },
  box: { name: 'The Mixed Six', cents: 3200, cookies: 6 }
};
const FLAVOURS = { chocolate: 'Milk/Dark Chocolate Sea Salt', maple: 'Maple Fudge & Pecan', butter: 'Butter Fudge' };
const MAX_COOKIES_PER_ORDER = 24;   // change here to raise or lower the per-order limit
const HST_PERCENT = '13';           // change here if the tax rate changes
const PICKUP_TEXT = 'Pickup Saturday, October 31, 2026, 5-9:30 p.m. at Jean Augustine Centre for Young Women’s Empowerment, 101 Portland Street, Etobicoke.';
const PICKUP_AT = '2026-10-31T17:00:00-04:00';
const RETURN_URL = 'https://gourmandhouse.ca/?ordered=1';

export function buildCart(input) {
  if (!input || !Array.isArray(input.items) || !input.items.length || input.items.length > 20) throw new Error('Your cart is empty.');
  const lines = [];
  let cookies = 0;
  for (const raw of input.items) {
    const product = Object.hasOwn(PRODUCTS, raw?.id) ? PRODUCTS[raw.id] : null;
    const quantity = raw?.qty;
    if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > MAX_COOKIES_PER_ORDER) throw new Error('One of the items in your cart is not valid.');
    let note;
    if (product.flavours) {
      const picks = raw.flavours;
      if (!Array.isArray(picks) || picks.length !== product.flavours || !picks.every(f => Object.hasOwn(FLAVOURS, f))) {
        throw new Error('Please choose all three flavours for your pack.');
      }
      note = picks.map(f => FLAVOURS[f]).join(' + ');
    }
    cookies += product.cookies * quantity;
    lines.push({
      name: product.name, quantity: String(quantity),
      base_price_money: { amount: product.cents, currency: 'CAD' },
      ...(note ? { note } : {})
    });
  }
  if (cookies > MAX_COOKIES_PER_ORDER) throw new Error('Orders are limited to ' + MAX_COOKIES_PER_ORDER + ' cookies. Please remove a few items.');
  return { lines, cookies };
}

function paymentLinkBody(env, lines, withPickup) {
  const order = {
    location_id: env.SQUARE_LOCATION_ID,
    line_items: lines,
    taxes: [{ uid: 'hst', name: 'HST', percentage: HST_PERCENT, scope: 'ORDER' }]
  };
  if (withPickup) {
    order.fulfillments = [{
      type: 'PICKUP', state: 'PROPOSED',
      pickup_details: { recipient: { display_name: 'Website order' }, schedule_type: 'SCHEDULED', pickup_at: PICKUP_AT, note: PICKUP_TEXT }
    }];
  }
  return {
    idempotency_key: crypto.randomUUID(),
    order,
    checkout_options: { redirect_url: RETURN_URL, ask_for_shipping_address: false, allow_tipping: false, enable_coupon: false },
    payment_note: PICKUP_TEXT
  };
}

async function createCheckout(env, input) {
  const { lines, cookies } = buildCart(input);
  const stock = await readStock(env);
  if (cookies > stock.remaining) {
    const err = new Error(stock.remaining === 0 ? 'Sorry, this drop is sold out.' : 'Only ' + stock.remaining + ' cookies are left. Please reduce your cart.');
    err.status = 409; throw err;
  }
  let result;
  try { result = await square('online-checkout/payment-links', env, paymentLinkBody(env, lines, true)); }
  catch { result = await square('online-checkout/payment-links', env, paymentLinkBody(env, lines, false)); }
  const url = result.payment_link?.url;
  if (typeof url !== 'string' || !url.startsWith('https://')) throw new Error('No checkout link');
  return url;
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin');
    const allowed = new Set(['https://gourmandhouse.ca', 'https://www.gourmandhouse.ca', 'https://snipa416.github.io']);
    const headers = { 'Content-Type': 'application/json', 'X-Content-Type-Options': 'nosniff', Vary: 'Origin', 'Cache-Control': 'no-store' };
    if (origin && allowed.has(origin)) headers['Access-Control-Allow-Origin'] = origin;
    if (origin && !allowed.has(origin)) return new Response('{}', { status: 403, headers });
    const path = new URL(request.url).pathname;
    if (path !== '/stock' && path !== '/checkout') return new Response('{}', { status: 404, headers });
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: { ...headers, 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } });
    if (path === '/stock' && request.method !== 'GET') return new Response('{}', { status: 405, headers });
    if (path === '/checkout' && request.method !== 'GET' && request.method !== 'POST') return new Response('{}', { status: 405, headers });
    if (!env.SQUARE_ACCESS_TOKEN || !env.SQUARE_LOCATION_ID || !Number.isFinite(Date.parse(env.DROP_START)) ||
        !Number.isFinite(Date.parse(env.DROP_END)) || Date.parse(env.DROP_START) >= Date.parse(env.DROP_END)) {
      return new Response('{"error":"Stock service is not connected"}', { status: 503, headers });
    }
    if (path === '/checkout') {
      // GET tells the website the cart is available. POST creates a Square checkout link.
      if (request.method === 'GET') return new Response('{"ready":true}', { headers });
      if (!origin || !allowed.has(origin)) return new Response('{}', { status: 403, headers });
      try {
        const text = await request.text();
        if (text.length > 4000) return new Response('{"error":"Request too large"}', { status: 413, headers });
        let input;
        try { input = JSON.parse(text); } catch { return new Response('{"error":"Bad request"}', { status: 400, headers }); }
        try { buildCart(input); } catch (e) { return new Response(JSON.stringify({ error: e.message }), { status: 400, headers }); }
        const url = await createCheckout(env, input);
        return new Response(JSON.stringify({ url }), { headers });
      } catch (e) {
        if (e.status === 409) return new Response(JSON.stringify({ error: e.message }), { status: 409, headers });
        return new Response('{"error":"Checkout is temporarily unavailable. Please try again in a moment."}', { status: 503, headers });
      }
    }
    try {
      const key = [env.SQUARE_LOCATION_ID, env.DROP_START, env.DROP_END].join(':');
      if (!cached || cached.key !== key || Date.now() - cached.at > 15000) {
        cached = { key, at: Date.now(), data: await readStock(env) };
      }
      return new Response(JSON.stringify(cached.data), { headers });
    } catch {
      // Never log or return tokens, card information, customer details, or raw Square responses.
      return new Response('{"error":"Stock is temporarily unavailable"}', { status: 503, headers });
    }
  }
};
