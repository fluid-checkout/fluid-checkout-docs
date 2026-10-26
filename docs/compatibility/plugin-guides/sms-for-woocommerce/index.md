---
title: "Compatibility with plugin SMS for WooCommerce by Zorem"
description: "Because the plugin SMS for WooCommerce loads its own version of the code component intl-tel-input, the International Phone Numbers feature from Fluid..."
sidebar_label: "SMS for WooCommerce"
slug: /plugins/sms-for-woocommerce
---

# Compatibility with plugin SMS for WooCommerce by Zorem

## International Phone Number feature

Because the plugin SMS for WooCommerce loads its own version of the code component `intl-tel-input`, the [International Phone Numbers feature from Fluid Checkout PRO](https://fluidcheckout.com/docs/feature-international-phone-numbers/) needs to be automatically deactivated when the conflicting feature is enabled in the settings of the plugin SMS for WooCommerce.

If you wish to use the [International Phone Numbers feature from Fluid Checkout PRO](https://fluidcheckout.com/docs/feature-international-phone-numbers/), you need to deactivate the phone number validation feature within the SMS for WooCommerce plugins settings:

- Go to WP Admin > WooCommerce > SMS Settings;
- Locate and expand the section “Checkout Options” in the “Settings” tab;
- Uncheck the option “Enable phone number validation on checkout”;
- Save your changes.
