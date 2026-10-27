# Archived EU-VAT Assistant changelog

This directory is not a docs route. The release history is published on the Fluid Checkout PRO changelog, in the EU VAT legacy section: `/pro/changelog/#eu-vat`.

`readme.txt` is the former EU-VAT Assistant plugin readme. Its `== Changelog ==` section is the release history from when EU-VAT Assistant was a separate plugin (26 versions, 0.1.0 through 2.1.2). That section is copied to `data/pro/legacy/eu-vat/readme.txt`, which the changelog generator reads. `changelog.md` here is the last page generated when `/eu-vat/changelog/` was its own route. It is not published.

The PRO plugin's own changelog sources, `data/pro/readme.txt` and `data/pro/changelog.md`, are unchanged. The legacy section is appended when `npm run generate` builds `docs/pro/changelog.md`.

The archived page and readme still use the old product name. That text is the historical release notes, including a note about compatibility with the official WooCommerce EU VAT Assistant extension, which is a different plugin. Do not add redirects from this change.
