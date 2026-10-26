# Supplemental EU VAT hook data

`actions.json` and `filters.json` are the former `data/eu-vat` fixture. `npm run generate` merges them into the Fluid Checkout PRO hook pages. They are not the hook export from `fluid-checkout/fluid-checkout-pro`.

That repository, on branch `release/next-FEATURE`, is the source of truth for PRO hooks, including the EU VAT hooks (`fc_vat_*`) that now live in the PRO plugin. This environment could not read that private repository, so these files were not regenerated from it. Do not copy them into `data/pro/actions.json` or `data/pro/filters.json`. Those two files stay the published PRO export.

`source.json` sets `pluginPrefix` to `fc_vat`. The generator normalizes this supplemental file with that prefix before merging it, so `self::$plugin_prefix` stays `fc_vat_*` instead of becoming `fc_pro_*`.

When the PRO repository publishes hook JSON that already includes these hooks, delete this directory. Until then, a supplemental hook whose normalized name already exists in `data/pro` is skipped and reported. There is no name collision with the current PRO export.

The fixture is not a complete hook API, and the source file paths are from the former EU-VAT Assistant export (`inc/checkout-eu-vat.php` and similar). They were not checked against `release/next-FEATURE`.
