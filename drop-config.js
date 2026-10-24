/* Update this file for each drop. Keep ordering closed until checkout and shared stock are verified. */
window.DROP = {
  orderingOpen: false,
  checkoutVerified: true,
  autoOpen: true,
  dropLabel: 'Drop 01',
  opensAt: '2026-10-23T09:00:00-04:00',
  opensLabel: 'Friday, October 23 at 9:00 a.m.',
  announcement: 'Orders open until Thursday, Oct 29 at 8 p.m. · Pickup Saturday, Oct 31',
  closedMessage: 'Orders open Friday, October 23 at 9:00 a.m. ET',
  // Orders close here (the dough needs a night in the fridge). Keep DROP_END in Cloudflare the same.
  closesAt: '2026-10-29T20:00:00-04:00',
  closesLabel: 'Thursday, October 29 at 8:00 p.m.',
  closedAfterMessage: 'Orders for this drop are closed · Pickup Saturday, October 31',
  email: 'gourmandhouse@gmail.com',
  capacity: 200,
  // Cookies already promised elsewhere (for example other pre-orders). Subtracted from the live count.
  reserved: 0,
  // Early access: share site?early=CODE with your list. Set code and open:true to let that link order first.
  earlyAccess: { code: '', open: false, opensAt: '', opensLabel: '' },
  forms: {
    alerts: {
      action: 'https://docs.google.com/forms/d/e/1FAIpQLSeC8-ucDqSXh10K_1c0SZzheHdjwJYB7nO5Rizaa1J9wONx7A/formResponse',
      email: 'emailAddress',
      phone: 'entry.2146014405'
    },
    events: {
      action: 'https://docs.google.com/forms/d/e/1FAIpQLScLfkUnBPdW44dNTBBcXlOQSUQ8XT1F8wSz_MXih0jwSmiBfg/formResponse',
      email: 'emailAddress',
      name: 'entry.507100871',
      type: 'entry.1742158712',
      date: 'entry.2079151309',
      count: 'entry.1648258946',
      place: 'entry.1088506959',
      message: 'entry.1375096338'
    }
  },
  pickup: {
    date: '2026-10-31',
    dateLabel: 'Saturday, October 31',
    timeLabel: '5–9:30 p.m.',
    start: '17:00',
    end: '21:30',
    timeZone: 'America/Toronto',
    venue: 'It’s OK* Studios',
    address: '468 Queen St W, Toronto, ON M5V 2B2'
  },
  upcoming: [
    { date: 'Oct 25', title: 'TH3RDSPACE pop-up', place: 'It’s OK* Studios, 468 Queen St W, Toronto' },
    { date: 'Oct 31', title: 'Cookie drop pickup', place: 'It’s OK* Studios, 468 Queen St W, Toronto', href: '#drop' }
  ],
  prices: { one: 6, three: 17, six: 32 },
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
