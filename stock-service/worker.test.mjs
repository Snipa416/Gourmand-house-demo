import test from 'node:test';
import assert from 'node:assert/strict';
import worker, { summarize } from './worker.mjs';
const config = { location: 'pickup', start: '2026-10-20T04:00:00Z', end: '2026-11-01T04:00:00Z', now: '2026-10-23T12:00:00Z' };
const order = (id, name, quantity = '1') => ({ id, location_id: 'pickup', created_at: config.now, state: 'OPEN', total_money: { amount: 600, currency: 'CAD' }, line_items: [{ name, quantity }] });
const payment = (id, status = 'COMPLETED', amount = 600) => ({ order_id: id, location_id: 'pickup', status, amount_money: { amount, currency: 'CAD' } });
test('only confirmed, fully paid purchases reduce the count', () => {
  const result = summarize([order('paid', 'Butter Fudge'), order('pending', 'Butter Fudge'), order('partial', 'Butter Fudge')], [payment('paid'), payment('pending', 'APPROVED'), payment('partial', 'COMPLETED', 100)], config);
  assert.equal(result.remaining, 199);
});
test('counts cookies, not packs; handles repeated API records once', () => {
  const six = order('six', 'The Mixed Six', '2');
  const result = summarize([six, six, order('three', 'Choose your three'), order('single', 'Maple Fudge & Pecan')], [payment('six'), payment('three'), payment('single')], config);
  assert.equal(result.remaining, 184);
});
test('ignores canceled orders, other locations, and older drops', () => {
  const canceled = { ...order('cancel', 'Butter Fudge'), state: 'CANCELED' };
  const other = { ...order('other', 'Butter Fudge'), location_id: 'elsewhere' };
  const old = { ...order('old', 'Butter Fudge'), created_at: '2026-09-01T00:00:00Z' };
  assert.equal(summarize([canceled, other, old], [payment('cancel'), payment('other'), payment('old')], config).remaining, 200);
});
test('rejects unknown items and fractional cookie quantities instead of showing a false count', () => {
  assert.throws(() => summarize([order('a', 'Unknown box')], [payment('a')], config));
  assert.throws(() => summarize([order('a', 'Butter Fudge', '1.5')], [payment('a')], config));
});
test('never displays negative remaining stock', () => {
  assert.equal(summarize([order('a', 'The Mixed Six', '34')], [payment('a')], config).remaining, 0);
});
test('unconnected endpoint returns unavailable, never a fabricated 200 remaining', async () => {
  const response = await worker.fetch(new Request('https://stock.example/stock'), {});
  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), { error: 'Stock service is not connected' });
});
