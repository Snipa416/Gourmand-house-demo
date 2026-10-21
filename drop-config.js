/* October 31 pickup. Keep ordering closed until checkout and shared stock are verified. */
window.DROP = {
  orderingOpen: false,
  checkoutVerified: false,
  announcement: 'Orders open · Pickup October 31, 5–9:30 p.m.',
  closedMessage: 'Orders are not open yet · Target launch Friday, October 23',
  email: 'gourmandhouse@gmail.com',
  capacity: 200,
  pickup: {
    date: '2026-10-31',
    start: '17:00',
    end: '21:30',
    timeZone: 'America/Toronto',
    venue: 'Jean Augustine Centre for Young Women’s Empowerment',
    address: '101 Portland Street, Etobicoke, ON M8Y 1B1'
  },
  prices: { one: 6, three: 21, six: 32 },
  // A public, sanitized stock endpoint. Never put a Square access token here.
  inventoryEndpoint: 'https://gourmandhouse-stock.gourmandhouse.workers.dev/stock',
  checkoutLinks: {
    chocolate: 'https://gourmandhouseco.square.site/s/order?item=DRMWBLZZCRJMIKTQ5ZEKVW5Z',
    maple: 'https://gourmandhouseco.square.site/s/order?item=4TNQNOQGJSZ7AA4GKZ66GOPD',
    butter: 'https://gourmandhouseco.square.site/s/order?item=53I4JJ34VBZESJE44U2ZQXVO',
    three: 'https://gourmandhouseco.square.site/s/order?item=TSF7D45E26FOKSCCIAAKHKHI',
    box: 'https://gourmandhouseco.square.site/s/order?item=F2WGFDLCLJZNH4SE24JYXA2L'
  }
};

