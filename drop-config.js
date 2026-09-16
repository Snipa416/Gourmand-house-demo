/*
  GOURMAND HOUSE — THIS WEEK'S DROP
  ---------------------------------
  This is the only file you need to edit for a normal weekly update.
  On GitHub: open this file, click the pencil icon, make your changes, then "Commit changes".
  The live site updates by itself within a minute or two.

  Rules so nothing breaks:
  - Keep the quotes ' ' around text and the commas at the end of lines.
  - Don't rename chocolate / maple / box. They're linked to the Google Form.
  - New photo? Upload it to the assets folder first, then put its file name here.
*/

window.DROP = {

  // Set to false when the drop sells out or ordering closes.
  orderingOpen: true,

  // Banner at the very top of the site.
  announcement: 'Now taking orders for Saturday pickup',
  closedMessage: 'Ordering is closed for this week. Follow @gourmandhouseco for the next drop.',

  // Pickup times shown in the bag.
  // IMPORTANT: these must match the choices in the Google Form exactly, letter for letter.
  pickupWindows: [
    'Saturday · 11:00–11:30 AM',
    'Saturday · 11:30 AM–12:00 PM',
    'Saturday · 12:00–12:30 PM'
  ],

  // Where orders, e-Transfers and event requests go.
  email: 'gourmandhouse@gmail.com',

  // Most of each item one online order can include (the Google Form allows 0–6).
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
