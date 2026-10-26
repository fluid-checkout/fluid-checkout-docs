---
title: "Compatibility with plugin Shipping Zones by Drawing"
description: "The plugin Compatibility with plugin Shipping Zones by Drawing is mostly compatible with Fluid Checkout, with only the exceptions below which should not..."
sidebar_label: "Shipping Zones by Drawing"
slug: /plugins/shipping-zones-by-drawing
---

# Compatibility with plugin Shipping Zones by Drawing

The plugin Compatibility with plugin Shipping Zones by Drawing is mostly compatible with Fluid Checkout, with only the exceptions below which should not affect most websites using it.

## Known compatibility issues

### Not compatible with the Local Pickup feature from Fluid Checkout PRO

When using the plugin Shipping Zones by Drawing with the Local Pickup feature from Fluid Checkout PRO enabled, the shipping method options are not updated correctly at checkout.

This happens because Fluid Checkout triggers the Shipping Zones by Drawing plugin to look up shipping methods for the current address too early in the request process, causing Shipping Zones by Drawing to not being able to calculate the coordinates for the current shipping address and therefore not allowing it to change the available options.

Refreshing the checkout page at this point seems to fix the problem temporarily and allowing the customer to complete the purchase.

If you encounter this issue on your website, please [contact us support team](https://fluidcheckout.com/support/).
