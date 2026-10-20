# Updating the Gourmand House website

The website is published from the `main` branch of this repository through GitHub Pages. It is currently a **menu preview**, not an active online store.

## Important: ordering is not live

- `drop-config.js` has `orderingOpen: false`.
- `index.html` independently keeps the old email/e-Transfer cart disabled while the Square checkout is being prepared.
- Changing `orderingOpen` to `true` in `drop-config.js` **will not activate ordering**. This is intentional, to prevent a misleading or incomplete checkout.
- The former Google Form submission pathway is disabled. Do not rely on the old order instructions or assume a new order has been received.
- October 23, 2026 is the **target launch date**, subject to payment and pickup being ready.

## Update the cookie menu

1. Open `drop-config.js` in GitHub and click the pencil icon.
2. Under `products`, update cookie names, descriptions, prices, allergen tags, and photo paths as needed.
3. Commit the changes to `main`.
4. Check the live preview at https://snipa416.github.io/Gourmand-house-demo/.

Keep the `chocolate`, `maple`, and `box` product keys until the ordering integration has been updated for any new products.

## Change a photo

1. In the `assets` folder, upload an optimized image using **Add file → Upload files**.
2. In `drop-config.js`, update the relevant product's `photo` field to its new path, such as `assets/new-cookie-photo.jpg`.
3. Commit and refresh the website.

## Before accepting orders

1. Confirm the real payment provider and set up a functioning Square storefront or checkout, including the payment methods customers will see.
2. Confirm and publish the exact pickup date, pickup location, and pickup windows. Do not accept orders without these.
3. Match products, available stock, prices, any taxes, and pickup information in Square to the website.
4. Test the full ordering and confirmation experience on desktop and mobile before activating any order buttons.
5. Check all links, event enquiry email, cookie images, and allergen details.
6. Only then replace the disabled preview buttons with the real, tested checkout links and announce that ordering is open.

**Do not simply unhide the old email/e-Transfer cart.** It was deliberately retired pending the new checkout.

## Connecting a purchased custom domain

**Do not add a `CNAME` file or change GitHub Pages domain settings until you own the domain and can update its DNS.**

Once you have purchased `gourmandhouse.ca`:

1. In GitHub, open the repository's **Settings → Pages → Custom domain**. Enter `gourmandhouse.ca` and save.
2. At the domain registrar, create these apex/root DNS records (`@`) for GitHub Pages:
   - A: `185.199.108.153`
   - A: `185.199.109.153`
   - A: `185.199.110.153`
   - A: `185.199.111.153`
3. Create a `www` CNAME record pointing to `snipa416.github.io` (not to the repository's subpath).
4. Remove conflicting default/parking records if appropriate, and allow time for DNS propagation.
5. Enable **Enforce HTTPS** in the GitHub Pages settings once the certificate is ready.
6. Update the website's Open Graph image and URL, as well as its structured-data `url` and `image` values, from the GitHub Pages address to the new domain. These changes should only be made after the domain is connected.
7. Test both `https://gourmandhouse.ca` and `https://www.gourmandhouse.ca` and confirm the desired redirect.

GitHub documentation: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
