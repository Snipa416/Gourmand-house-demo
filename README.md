# Gourmand House

Static website hosted by GitHub Pages at https://gourmandhouse.ca/. Square hosts the payment checkout at https://gourmandhouseco.square.site/.

## October 31 pickup

- Orders are planned to open Friday, October 23, 2026; ordering stays disabled until checkout and shared inventory are verified.
- Pickup: Saturday, October 31, 2026, 5–9:30 p.m., It’s OK* Studios, 468 Queen St W, Toronto, ON M5V 2B2.
- Flavours: Chocolate Sea Salt, Maple Fudge & Pecan, Butter Fudge.
- Prices: one cookie $6; three customer-chosen cookies $17; six baker's-choice cookies $32.
- Maximum batch capacity: 200 cookies across singles and packs together.

## Current payment verification

Square reports its payment processor connected. A one-cookie cart reached the secure $6 card payment page with the correct pickup details. The owner chose to skip a real charge, so payment authorization, receipt delivery and paid-order inventory deductions have NOT been verified.

The GitHub website remains a menu preview. Its retired email/e-Transfer cart is removed. The existing event-enquiry email form remains available.

## Remaining launch work

1. Resolve Chocolate and Maple inventory visibility in Square; check that all singles are purchasable from the It’s OK* Studios pickup location.
2. Configure the $17 three-pack with exactly three customer-selected flavours and the $32 six-pack as baker's choice.
3. Enforce the shared 200-cookie supply across all products. Independent pack inventory must not create additional cookie capacity.
4. Deploy and authorize the read-only stock service described in `stock-service/README.md`, test it against Square, and set `inventoryEndpoint` in `drop-config.js`.
5. Enter verified Square item links, then test mobile and desktop checkout and the count after a confirmed test order.
6. Set `checkoutVerified` and `orderingOpen` to true only after launch checks pass and the owner is ready to accept orders. No automatic opening time has been configured.

Never put a Square access token in frontend files or a public repository. The stock counter must show unavailable when it cannot retrieve a fresh count. A display counter alone does not enforce checkout capacity.
