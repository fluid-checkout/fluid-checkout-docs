---
title: "Compatibility with Checkout Field Editor (free and PRO) by ThemeHigh"
description: "The plugin Checkout Field Editor PRO is generally compatible with Fluid Checkout Lite, PRO and our other add-ons and generally recommended, however, some..."
sidebar_label: "Checkout Field Editor"
slug: /plugins/checkout-field-editor
---

# Compatibility with Checkout Field Editor (free and PRO) by ThemeHigh

The plugin Checkout Field Editor PRO is generally compatible with Fluid Checkout Lite, PRO and our other add-ons and generally recommended, however, some issues are still present.

## Performance issues with Fluid Checkout PRO

We are aware of **performance issues** with Fluid Checkout only **when using Fluid Checkout PRO with the 3rd-party plugin Checkout Field Editor PRO by ThemeHigh**.

We have already fixed these performance issues on Fluid Checkout Lite and PRO regarding compatibility with the ThemeHigh’s plugin, however, changes to their plugin are also needed. We have already contacted ThemeHigh and provided all the necessary code and information they need to fix these performance issues on their side, however, they have not yet updated their plugin with these improvements.

## Address Autofill with Fluid Checkout Lite and PRO

Unfortunately the Address Autofill feature from the plugin Checkout Field Editor PRO by ThemeHigh does not seem to be compatible with Fluid Checkout Lite and PRO.

We believe it used to work well in previous versions of their plugin, but that is no longer the case. This issue happens because Fluid Checkout needs to replace some parts of the checkout page including the shipping a billing fields which is not expected by other plugins. Changes to the Checkout Field Editor PRO plugin are needed to fix this issue, which we are unable to do from our side.

There is an explanation of this issue on our documentation at:

- [Troubleshooting – jQuery events or vanilla JavaScript events not working](https://fluidcheckout.com/docs/troubleshoot-js-events/)

As an alternative, we recommend using our [Google Address Autocomplete add-on](https://fluidcheckout.com/fc-google-address-autocomplete/) as it is 100% compatible with Fluid Checkout and also with the Checkout Field Editor PRO by ThemeHigh.

## Address Autofill with our Google Address Autocomplete add-on

When using the plugin Checkout Field Editor PRO by ThemeHigh and our [Google Address Autocomplete add-on](https://fluidcheckout.com/fc-google-address-autocomplete/), some features of the Checkout Field Editor PRO plugin might be deactivated. Having both our Google Address Autocomplete add-on and the “Address Autofill” enabled at the same time might cause errors such as the Google Maps scripts being loaded more than once, or loading unnecessary scripts, thus impacting performance.

Since the main function for our Google Address Autocomplete add-on is to add the address autofill using the address suggestions from the Google Maps and Places APIs, our add-on will automatically deactivate the option “Address Autofill” from the Checkout Field Editor PRO plugin.

If you try to enable the “Address Autofill” function in the Checkout Field Editor PRO advanced settings, you’ll notice that it is not possible to save that option as enabled, that is because our add-on will set the option value to “always disabled”.

## Fix missing VAT Number field

The VAT number field is part of Fluid Checkout PRO. If the VAT Number field is missing, this might be happening because the Checkout Field Editor plugin is not recognizing the newly added field. For more information on why this happens and how to fix this, please visit our documentation [Fix missing VAT field when using checkout fields customization plugins](https://fluidcheckout.com/docs/fix-missing-vat-field/).

## Filter and action hooks

### Best practices

If you are unsure about how to add the code snippets to your website, check our article:  
[How to safely add code snippets to your WooCommerce website](https://fluidcheckout.com/docs/how-to-add-code-snippets/)

### Filters

- [`fc_integration_woo_checkout_field_editor_pro_enable_edit_address_changes`](/lite/hooks/fc_integration_woo_checkout_field_editor_pro_enable_edit_address_changes/) – Controls whether to enable edit address changes for WooCommerce Checkout Field Editor Pro.
- [`fc_thwcfe_clear_field_keys_skip_list`](/lite/hooks/fc_thwcfe_clear_field_keys_skip_list/) – Defines field keys to skip when clearing THWCFE fields.
- [`fc_pro_thwcfe_custom_section_substep_position_args`](/pro/hooks/fc_pro_thwcfe_custom_section_substep_position_args/) – Filters the position arguments for custom section substeps.
- [`fc_pro_thwcfe_substep_text_display_value_show_field_label`](/pro/hooks/fc_pro_thwcfe_substep_text_display_value_show_field_label/) – Filters whether to show field labels in substep text.
- [`fc_pro_thwcfe_substep_text_display_value_{field_args}type`](/pro/hooks/fc_pro_thwcfe_substep_text_display_value_field_argstype/) – Filters the display value for specific field types.
- [`fc_pro_thwcfe_substep_text_display_value_{field_key}`](/pro/hooks/fc_pro_thwcfe_substep_text_display_value_field_key/) – Filters the display value for specific field keys.
- `fc_pro_thwcfe_substep_text_content_none_{section_name}` – Filters the text displayed when a custom section has no content.
- `fc_pro_thwcfe_{section_name}_substep_text` – Filters the complete substep text HTML for a specific custom section.
