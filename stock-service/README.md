# Confirmed-order stock counter

This service is prepared but NOT DEPLOYED or connected. GitHub Pages remains the website host. The optional counter runs on a Cloudflare Worker and returns only capacity, confirmed cookie quantity, remaining quantity, and an update timestamp. Cloudflare has a free Workers plan; do not enable paid usage or purchase a plan.

The Worker reads Square orders and completed payments for the dedicated October 31 pickup location. Abandoned carts, approved-but-uncompleted payments and underpaid orders do not reduce stock. A single deducts one cookie, Choose your three deducts three, and The Mixed Six deducts six. It refreshes after at most 15 seconds of service caching plus the website's 20-second refresh and Square's consistency delay.

## Activation requires the owner

1. Confirm the Square location ID matches It’s OK* Studios — Oct 31.
2. Authorize a Square API connection limited to ORDERS_READ and PAYMENTS_READ. Do not create or copy persistent credentials without the owner's approval. The owner should enter the credential directly in Cloudflare as the encrypted `SQUARE_ACCESS_TOKEN` secret; never paste it into this repository, frontend config, chat, screenshots or logs.
3. Deploy this folder to a Cloudflare Workers FREE account, with no nameserver or domain transfer and no paid upgrades. Check account terms with the owner if account creation is needed.
4. Test the deployed `/stock` endpoint against actual Square records, then place its HTTPS URL in `drop-config.js` as `inventoryEndpoint`.
5. Test the website counter and browser failure behavior.

## Launch blockers

- The 200-cookie aggregate counter is a DISPLAY, not an atomic stock-reservation system. It does not prevent overselling across independently tracked singles and pack SKUs. Do not enable ordering until shared stock or a fixed capacity allocation is configured and tested in checkout.
- The Square three-pack does not exist yet; configure exactly three customer-selected flavours at $21, and verify the final item name matches the mapping in `worker.mjs`.
- The Mixed Six is currently sold out / POS-only; change its description to baker's choice and connect stock before making it available online.
- Chocolate and Maple are not currently appearing as purchasable on the live Square menu; resolve their online inventory visibility.
- Refunds by themselves do not restore baking capacity. Canceled orders are excluded; an operational policy for cancellations/restocks must be agreed before launch.
- The website remains closed (`orderingOpen: false`, `checkoutVerified: false`). Do not enable those flags based only on a display counter or a payment page loading.

Run offline checks: `node --test stock-service/worker.test.mjs` from the repository root. No real card charge has been made.
