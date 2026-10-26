---
title: "Compatibility with plugin “Plugin Organizer”"
description: "When using the Plugin Organizer plugin, some layout issues might be caused by the lack of the changes applied by Fluid Checkout to the WooCommerce AJAX..."
sidebar_label: "Plugin Organizer"
slug: /plugins/plugin-organizer
---

# Compatibility with plugin “Plugin Organizer”

When using the Plugin Organizer plugin, some layout issues might be caused by the lack of the changes applied by Fluid Checkout to the WooCommerce AJAX calls that generate the HTML for the order review section and other parts of the checkout page.

The scripts and styles are usually loaded correctly, but the HTML is different than that which is expected so the styles are not applied correctly.

When deactivating/disabling Fluid Checkout globally with the **Plugin Organizer**, you also deactivate it for WooCommerce AJAX calls, which are needed to update the checkout state and refresh the checkout page parts.

Even if you activate Fluid Checkout only on the checkout page or via the *Plugin Filters* feature of the Plugin Organizer, Fluid Checkout would still be disabled for WooCommerce AJAX calls because these requests use the homepage URL with query string parameters, and data is sent via HTTP POST method.

**You can use*****Plugin Filters*****to enable Fluid Checkout for the specific WooCommerce AJAX calls**. However, the wildcard char `*` does not work in this context, so you’ll have to add each specific WooCommerce AJAX URL.

Also, keep in mind Fluid Checkout affects the following pages and URL paths:

- **Checkout**
- **Cart** (PRO)
- **Order received** (PRO)
- **Account > Orders** (PRO)
- **Account > Addresses**, changes to the address fields at checkout are also applied here.
- **WC AJAX calls**: *https://your-domain.tld/?wc-ajax=&lt;endpoint>*

*The list of pages affected by Fluid Checkout might change in the future with the introduction of new features.*
