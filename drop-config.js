/*
  GOURMAND HOUSE — OCTOBER 23 PREVIEW
  ---------------------------------
  Ordering remains closed until the Square storefront and pickup details are ready.
  The October 23 date is a target, not an automatic switch or a guaranteed opening.

  Rules so nothing breaks:
  - Keep the quotes ' ' around text and the commas at the end of lines.
  - Don't rename chocolate / maple / box. They're used by the preview page.
  - New photo? Upload it to the assets folder first, then put its file name here.
*/

window.DROP = {

  // Kept false while the Square checkout is being prepared.
  orderingOpen: false,

  // Banner at the very top of the site.
  announcement: 'Target order opening: Friday, October 23',
  closedMessage: 'Orders are not open yet · Target launch October 23',

  // Pickup details have not been chosen for the October 23 launch.
  pickupWindows: [],

  // Contact address for event requests and customer questions.
  email: 'gourmandhouse@gmail.com',

  // Historical cart limit; online quantity limits will be set in Square.
  maxPerItem: 6,

  products: {
    chocolate: {
      name: 'Milk/Dark Chocolate Sea Salt',
      price: 6,
      description: 'Milk chocolate, 70% dark chocolate, sea salt flakes.',
      tag: '',                                   // e.g. 'Contains pecans'. Leave '' for none.
      photo: 'assets/milk-dark-chocolate-sea-salt.jpg',
      photoAlt: 'Milk and dark chocolate sea salt cookies with large chocolate pieces and salt flakes'
    },
    maple: {
      name: 'Maple Fudge & Pecan',
      price: 6,
      description: 'Rich maple fudge, roasted pecans.',
      tag: 'Contains pecans',
      photo: 'assets/maple-fudge-pecan.jpg',
      photoAlt: 'Maple fudge and pecan cookies on a wooden table'
    },
    box: {
      name: 'The Mixed Six',
      price: 32,
      description: 'Three of each flavour.',   // the site adds how much they save automatically
      photo: 'assets/mixed-six-both-flavours.jpg',
      photoAlt: 'Close-up of both Gourmand House flavours together'
    }
  }
};


