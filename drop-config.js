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
  inventoryEndpoint: '',
  checkoutLinks: {
    chocolate: '',
    maple: '',
    butter: 'https://gourmandhouseco.square.site/s/order?item=53I4JJ34VBZESJE44U2ZQXVO',
    three: '',
    box: ''
  }
};

