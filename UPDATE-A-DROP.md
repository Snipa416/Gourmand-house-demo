# Updating the Gourmand House website

The `main` branch publishes through GitHub Pages. The website remains closed for orders while Square checkout and shared inventory are prepared.

## Confirmed drop details

See `README.md` for the October 31 pickup, three flavours, prices and 200-cookie maximum. The three-pack is customer-selected; the six-pack is baker's choice. Change the HTML menu and `drop-config.js` together when prices or pickup details change.

## Stock counter

`stock-counter.js` requests the configured `inventoryEndpoint` every 20 seconds while the page is visible. It only displays a fresh, valid count from the stock service. Missing configuration shows the batch maximum, never an invented remaining quantity. Failed or stale requests stop the order buttons from activating.

The prepared read-only backend lives in `stock-service/`. It is not connected until the owner authorizes its deployment and Square credential storage. Do not place credentials in `drop-config.js`.

## Activate ordering

1. Complete the launch checklist in `README.md`, including shared stock enforcement in checkout.
2. Set verified Square item URLs in `checkoutLinks`.
3. Connect and verify the live stock endpoint.
4. Only then set `checkoutVerified: true` and `orderingOpen: true`.
5. Check every flavour and pack in a real customer browser. A card form loading is not proof that a charge succeeds.

Do not restore the retired email/e-Transfer checkout. Event enquiries continue to open an email draft.

## Domain

Porkbun DNS uses an apex ALIAS to `snipa416.github.io`, a `www` CNAME to `snipa416.github.io`, and the GitHub ownership verification TXT record. Keep the TXT record. Keep GitHub Pages as host and preserve email settings. HTTPS enforcement must be enabled in GitHub Pages once the certificate is available.
