/* Update this file for each drop. Keep ordering closed until checkout and shared stock are verified. */
window.DROP = {
  orderingOpen: false,
  checkoutVerified: true,
  autoOpen: true,
  dropLabel: 'Drop 01',
  opensAt: '2026-11-07T09:00:00-05:00',
  opensLabel: 'Saturday, November 7 at 9:00 a.m.',
  announcement: 'Orders open until Thursday, Nov 12 at 8 p.m. · Pickup Saturday, Nov 14',
  closedMessage: 'Orders open Saturday, November 7 at 9:00 a.m. ET',
  // Orders close here (the dough needs a night in the fridge). Keep DROP_END in Cloudflare the same.
  closesAt: '2026-11-12T20:00:00-05:00',
  closesLabel: 'Thursday, November 12 at 8:00 p.m.',
  closedAfterMessage: 'Orders for this drop are closed · Pickup Saturday, November 14',
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
    date: '2026-11-14',
    dateLabel: 'Saturday, November 14',
    timeLabel: '3–8 p.m.',
    start: '15:00',
    end: '20:00',
    timeZone: 'America/Toronto',
    venue: '',
    // Public area only. The full street address goes out in the Square receipt and confirmation email (Worker + Gmail), never in this file.
    address: 'Scarborough, ON'
  },
  upcoming: [
    { date: 'Nov 14', title: 'Cookie drop pickup', place: 'Scarborough', href: '#drop' }
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
