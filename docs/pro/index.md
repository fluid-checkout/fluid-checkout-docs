---
slug: /
sidebar_position: 1
title: Fluid Checkout PRO
description: Developer hooks and REST API for the Fluid Checkout PRO plugin.
---

# Fluid Checkout PRO

Developer reference for Fluid Checkout PRO. These pages cover the WordPress actions and filters the plugin runs at checkout and in its settings screens, and the REST API endpoints under `fluid-checkout/v1`.

## EU VAT

EU VAT features are part of Fluid Checkout PRO. Fluid Checkout PRO deactivates the former EU-VAT Assistant plugin and inherits its settings. Settings are in WP Admin > Fluid Checkout > Settings.

Hooks for these features use the `fc_vat_` prefix and are listed on [Using PHP hooks](/pro/hooks/).

## REST API (upcoming)

- [REST API overview](/pro/rest-api/) lists authentication notes, shared response shape, and every endpoint. This reference is upcoming and may change before the public release.
- [REST API errors](/pro/rest-api/errors/) lists every wire error code (`fc_api_*`) for this plugin.
- Each endpoint page (for example [`GET /address-book`](/pro/rest-api/get-address-book/)) includes the route, parameters, and optional examples.

## Hooks

- [Using PHP hooks](/pro/hooks/) lists every action and filter. Each hook page includes the signature, parameters, the version that introduced it, and the source file.
- [Changelog](/pro/changelog/) lists every release, newest first.
