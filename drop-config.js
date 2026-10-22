/* Update this file for each drop. Keep ordering closed until checkout and shared stock are verified. */
window.DROP = {
  orderingOpen: true,
  checkoutVerified: true,
  autoOpen: true,
  dropLabel: 'Drop 01',
  opensAt: '2026-10-23T19:00:00-04:00',
  opensLabel: 'Friday, October 23 at 7:00 p.m.',
  announcement: 'Orders open · Pickup October 31, 5–9:30 p.m.',
  closedMessage: 'Orders open Friday, October 23 at 7:00 p.m. ET',
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
    venue: 'Jean Augustine Centre for Young Women’s Empowerment',
    address: '101 Portland Street, Etobicoke, ON M8Y 1B1'
  },
  upcoming: [
    { date: 'Oct 25', title: 'TH3RDSPACE pop-up', place: 'It’s OK* Studios, 468 Queen St W, Toronto' },
    { date: 'Oct 31', title: 'Cookie drop pickup', place: 'Jean Augustine Centre, 101 Portland Street, Etobicoke', href: '#drop' }
  ],
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
