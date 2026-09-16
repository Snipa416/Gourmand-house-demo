# Gourmand House

Website for Gourmand House, small-batch cookies in Toronto.
Live at https://snipa416.github.io/Gourmand-house-demo/

It's a single static page (`index.html`) served by GitHub Pages. No build step.

## Weekly updates

Open `index.html` and find the block near the bottom marked **Edit these each week**:

- `orderingOpen`: set to `false` when the drop closes or sells out. Buttons switch off and the banner changes.
- `pickupWindows`: the Saturday pickup times shown in the bag.
- `email`: where orders, e-Transfers and event requests go.
- `maxPerItem`: most of each item one online order can include (6, to match the Google Form).

Prices and product names are in `PRODUCTS` right below it. If you change a price, also update the price shown on the product card and the status strip.

## How orders work

There's no payment system on the site. When someone places an order, they get an order number and a button that opens a pre-filled email to Gourmand House, plus e-Transfer instructions. Event and pop-up requests work the same way through the booking form.

The order form asks the same questions as the "Gourmand House — Cookie Order Form" Google Form (full name, email, phone, cookie quantities, pickup window, notes, and the confirmation checkbox). Each order is also sent to that Google Form in the background, so responses collect there too. For that to work, the Google Form has to be published and accepting responses, and its pickup window choices must match `pickupWindows` exactly. To turn it off, set `googleForm.enabled` to `false`.

## Photos

All images live in `assets/`, resized for fast loading.
