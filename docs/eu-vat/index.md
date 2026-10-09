---
slug: /
sidebar_position: 1
title: EU-VAT Assistant
description: Developer hooks and guides for the EU-VAT Assistant plugin.
---

# EU-VAT Assistant

Developer reference for the EU-VAT Assistant add-on. The pages here cover the WordPress actions and filters the plugin runs at checkout and in its settings screens.

## Start here

- [Getting started with EU-VAT Assistant hooks](/eu-vat/guides/getting-started) shows how to attach a callback and how dynamic hook names are written.
- [All hooks](/eu-vat/hooks) is the generated index. Each hook has its own page with the signature, parameters, `@since` version, and source file.

## Sample hook data

The hook pages are generated from [`data/eu-vat`](https://github.com/fluid-checkout/fluid-checkout-docs/tree/main/data/eu-vat). Those JSON files are a fixture with a handful of realistic entries, not the full plugin API. They will be replaced when the EU-VAT Assistant repository publishes `actions.json` and `filters.json`.

EU-VAT Assistant is a private repository, so source locations on hook pages are file paths only. Public plugins can be configured to link those paths to GitHub.

Guides and examples on this site are written by hand. Hook pages are not. Edit `data/eu-vat`, then run `npm run generate`.
