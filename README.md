# Gourmand House

Website for Gourmand House, small-batch cookies in Toronto.
Live at https://snipa416.github.io/Gourmand-house-demo/

It's a single static page (`index.html`) served by GitHub Pages. No build step.

## Weekly updates

Edit **`drop-config.js`**. It holds ordering open/closed, the banner, pickup windows, email, and product names, prices, descriptions and photos. Step-by-step instructions are in [UPDATE-A-DROP.md](UPDATE-A-DROP.md).

## How orders work

There's no payment system on the site. When someone places an order, they get an order number and a button that opens a pre-filled email to Gourmand House, plus e-Transfer instructions. Event and pop-up requests work the same way through the booking form.

The order form asks the same questions as the "Gourmand House — Cookie Order Form" Google Form (full name, email, phone, cookie quantities, pickup window, notes, and the confirmation checkbox). Each order is also sent to that Google Form in the background, so responses collect there too. For that to work, the Google Form has to be published and accepting responses, and its pickup window choices must match `pickupWindows` in `drop-config.js` exactly. To turn it off, set `googleForm.enabled` to `false` in `index.html`.

## Photos

All images live in `assets/`, resized for fast loading.
