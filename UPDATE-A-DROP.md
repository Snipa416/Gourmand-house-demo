# Updating the website for a new drop

Everything below is done on github.com. No software needed. Changes go live in about 1–2 minutes.

## Change prices, descriptions, pickup times, or open/close ordering

1. Go to the repo and open **drop-config.js**.
2. Click the **pencil icon** (Edit this file).
3. Change what you need:
   - `orderingOpen: true` or `false`. Use `false` when the drop sells out. The buttons switch off and the top banner changes.
   - `announcement`: the banner text at the top.
   - `pickupWindows`: the pickup times. **Change the same times in the Google Form too**, or form responses will fail.
   - `products`: names, prices, descriptions, and tags for each cookie and the Mixed Six.
4. Scroll down, click **Commit changes**, and choose **Commit directly to the main branch**.
5. Wait a minute, then refresh the website to check.

## Swap a product photo

1. Open the **assets** folder, click **Add file → Upload files**, and upload the new photo.
   - Use a simple name with no spaces, like `maple-fudge-pecan-october.jpg`.
   - Keep photos under about 400 KB (export at around 1200 px wide) so the site stays fast.
2. Open **drop-config.js** and change that product's `photo` to `assets/your-new-file.jpg`.
3. Commit.

## Before you commit, check

- Every line of text still has its quotes `' '` and ends with a comma.
- You didn't rename `chocolate`, `maple`, or `box`. Those names are linked to the Google Form.

If the page ever looks broken after a change, open the repo's **Commits** page, click the last change, and use **Revert**, or ask Claude to fix it.

## Adding a new flavour

Adding a third flavour needs changes to the page layout and a new row in the Google Form, so ask Claude to do it.

## Orders

- Orders arrive two ways: the customer's email to you, and a response in the **Gourmand House — Cookie Order Form** (Google Forms → Responses). Match each order to its e-Transfer using the order number (for example `GH-0918-AB12`).
- Delete any responses named **TEST ORDER** that were made while setting up.
