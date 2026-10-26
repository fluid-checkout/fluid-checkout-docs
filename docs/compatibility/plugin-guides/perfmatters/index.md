---
title: "Compatibility with plugin Perfmatters"
description: "When you use Google Address Autocomplete for WooCommerce the checkout loads Google’s Maps JavaScript API for address suggestions. Perfmatters plugin can..."
sidebar_label: "Perfmatters"
slug: /plugins/perfmatters
---

# Compatibility with plugin Perfmatters

## What happens

When you use **Google Address Autocomplete for WooCommerce** the checkout loads Google’s Maps JavaScript API for address suggestions. **Perfmatters** plugin can block those scripts with its “*Disable Google Maps*” option. When that option is on, autocomplete may stop working or behave incorrectly because the Google’s Maps JavaScript code never loads.

## What to do

1. Go to WP Admin > Settings > Perfmatters.
2. Find “*Disable Google Maps*” and turn it off (do not disable Google Maps while using this autocomplete integration).

Perfmatters optimizes performance by removing Google Maps across the site. That is useful on many sites, but it conflicts with **Google Address Autocomplete for WooCommerce** that depends on the same scripts.
