=== Fluid Checkout for WooCommerce - PRO ===
Contributors: diegoversiani
Tags: woocommerce, checkout, conversion, multi-step, one-page
Requires PHP: 7.4
Requires at least: 6.5
Tested up to: 7.1
Stable tag: 5.0.0
License: Proprietary
License URI: https://fluidcheckout.com/terms/

An even better Fluid Checkout experience for any WooCommerce store. The PRO version provides your store with optimized Cart and Order Received pages, account matching, edit cart items at checkout, and more to come.

== Description ==

An even better Fluid Checkout experience for any WooCommerce store. The PRO version provides your store with optimized Cart and Order Received pages, account matching, edit cart items at checkout, and more to come.

== Installation ==

= Minimum Requirements =

* PHP 7.4 or later
* WordPress 6.5 or later
* WooCommerce 6.5 or later

= Automatic installation =

Log in to your WordPress dashboard, navigate to the Plugins menu and click Add New.

Press the "Upload Plugin" and select the zip file, then click "Install Now".

= Manual installation =

1. Upload Fluid Checkout for WooCommerce - PRO to the `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. All done.


== Changelog ==

= 5.0.0 - 2026-11-08 =

* Added: Bundle Fluid Checkout Lite inside the PRO package. Lite is no longer required for PRO. PRO automatically deactivates legacy Lite and add-ons if they are still active.
* Added: Moved Address Book add-on into PRO.
* Added: Moved Google Address Autocomplete add-on into PRO.
* Added: Moved EU-VAT Assistant into PRO.

* Bump tested up to WooCommerce 11.3
* Added: New feature design customization settings.
* Added: New feature delayed account creation.
* Added: New Local Pickup feature, changed default behavior with support for pickup locations unrelated to shipping zones.
* Added: Support for the Split design template with the 1-column layout on checkout, cart and order received pages.
* Added: Setting to choose a background color for the Split design secondary column.
* Added: Compatibility with theme Purple.
* Improved: Replaced the license system with own Fluid Licenses.
* Improved: License key expiration dates now show in the site timezone.
* Improved: Compatibility with plugin Order Delivery for WooCommerce by Kestrel. Update the delivery date template file to support version 4.0.0 of that plugin.
* Improved: Compatibility with plugin Wawp - OTP Verification, Order Notifications, and Country Code Selector for WooCommerce. Disable the international phone number fields setting and explain why it is forced when that plugin is active.
* Improved: Compatibility with plugin WooCommerce Stripe Gateway. Update express checkout banner template to match upstream skeleton loading behavior while keeping Fluid Checkout layout changes.
* Improved: Compatibility with WooCommerce feature Order Fulfillments. Style the order details fulfillments templates and table layout.
* Improved: Updated replaced templates `cart.php`, `thankyou.php`, and `email-order-details.php` for WooCommerce 11.2.0 compatibility.
* Improved: Filter `fc_pro_pickup_point_address_data` keeps its previous argument order and adds the shipping method object as a fourth argument.
* Improved: Show EU-VAT validation status in Checkout Field Editor Pro custom section review text.
* Fixed: Compatibility with theme TheGem. Display the theme page title on the cart page after the header.
* Fixed: Compatibility with plugin ActiveCampaign for WooCommerce. Fix cart item quantity updates failing for guests without an email address.
* Fixed: Compatibility with plugin Checkout Field Editor PRO by Themehigh. Keep the contact review text and checkout fragments when the editor is unavailable, and skip one invalid section instead of stopping the rest. Fix substeps marked as incomplete when required fields or sections are hidden by conditional rules.
* Fixed: Compatibility with plugin Order Delivery for WooCommerce by Kestrel. Fix delivery date and time frame being cleared when switching shipping methods. Fix time frame keeping the previous selection after changing the date. Fix delivery date section being displayed when no dates are available, or when that plugin is set to show dates for pickups only.
* Fixed: Compatibility with plugin Order Delivery Date Pro for WooCommerce by Tyche Softwares. Fix delivery date fields not being displayed and labels not being applied correctly.
* Fixed: Compatibility with plugin Payment Plugins for Stripe WooCommerce. Fix duplicate express checkout banner and endless skeleton loader on checkout when using Stripe 4.0+.
* Fixed: Compatibility with plugin WooCommerce Stripe Gateway. Fix checkout distraction free template not working when Stripe's express checkout is enabled.
* Fixed: Checkout reload when "Force billing and shipping addresses to the same" must switch between the merged address section and a separate billing step after cart items change whether shipping is needed.
* Fixed: Substep corner styles on the order pay page before JavaScript runs.
* Fixed: Shipping methods section on the cart page staying blocked with a loading overlay after clicking the update button of the shipping calculator without changing the address fields.
* Fixed: Order summary background color missing for guest customers on desktop when using the Split design template.
* Fixed: International phone country names now follow the active site language, including WPML.
* Fixed: Order Delivery estimated time and Points and Rewards redeem message position show a field label.
* Fixed: WooCommerce Subscriptions keeps the default for one shipping methods section until that option is enabled.
* Fixed: PHP deprecation notice across the plugin.
* Deprecated: Filter `fc_pro_is_substep_pickup_location_visible`, use `fc_pro_is_substep_delivery_visible` instead.
* Deprecated: Filter `fc_substep_pickup_point_attributes`, use `fc_substep_delivery_attributes` instead.
* Deprecated: Filter `fc_pro_pickup_point_label_text`, use `fc_substep_title_delivery` instead.
* Deprecated: Action `fc_pro_pickup_point_fields`, use `fc_pro_delivery_fields` instead.
* Deprecated: Filter `fc_substep_pickup_point_text_lines`, use `fc_substep_delivery_text_lines` instead.
* Deprecated: Filter `fc_pro_order_pay_substep_pickup_point_text_lines`, use `fc_pro_order_pay_substep_shipping_method_text_lines` instead.
* Deprecated: Filter `fc_substep_gift_cards_section_title`, use `fc_substep_title_gift_cards` instead.
* Removed: Filter `fc_pro_override_template_with_theme_file`, use `fc_override_template_with_theme_file` from Fluid Checkout Lite instead.
* Removed: Filter `fc_vat_reverse_charge_countries_skip_list_options`, only intended for internal use and now obsolete.
* Removed: Unused filter registration in the compatibility with Amazon Pay.

Address Book
* Added: Moved Address Book add-on into PRO.
* Added: New display layout options for saved addresses (cards, list, dropdown).
* Added: Search field for saved addresses at checkout when many addresses are available.
* Added: New REST API endpoints for address book entries.
* Added: Filters for restricting actions customer can take on their saved address.
* Improved: Update template files and other replacements from WooCommerce.
* Fixed: Select the first available address source when the value saved in the session is no longer offered.
* Fixed: Do not save pickup location into address book when Local Pickup is selected.
* Fixed: Detect local pickup from the selected shipping method when the delivery type is still the default ship value.
* Fixed: "Same as billing address" behavior on the cart shipping calculator.

Google Address Autocomplete
* Added: Moved Google Address Autocomplete add-on into PRO.
* Improved: Disable WooCommerce address autocomplete while Google Address Autocomplete is enabled to avoid conflicting suggestion UIs.

EU-VAT Assistant
* Added: Moved EU-VAT Assistant into PRO.
* Fixed: Prevent fatal errors when loading admin notice styles before plugin features are initialized.
* Fixed: Unlock VAT Assistant settings and remove the promo card when this add-on is active.

= 4.0.7 - 2026-10-26 =

* Added checks whether the plugin is active before loading it, preparing for the upcoming release of Lite and PRO 5.0.

= 4.0.6 - 2026-08-19 =

* Bump tested up to WordPress 7.1+
* Added: Compatibility with theme Sober (by Uixthemes).
* Added: Compatibility with plugin B2BKing.
* Added: Compatibility with plugin Order Delivery Date Pro for WooCommerce by Tyche Softwares.
* Improved: Update replacement files for Revolut Gateway for WooCommerce.
* Improved: Compatibility with plugin WooCommerce Subscriptions. Add option to show only one shipping methods section for subscription orders.
* Fixed: Compatibility with theme Shoptimizer. Fix misplaced quantity field layout caused by theme quantity-nav markup conflicting with Fluid Checkout Pro quantity spinners.
* Fixed: International phone field country flag not being automatically selected when limiting countries to those allowed for shipping or billing.
* Fixed: Precise phone number validation no longer sends checkout back to the shipping address after refresh for US and similar numbers.
* Fixed: Fatal error when using international phone number fields with 3rd-party plugins that request the checkout address fields multiple times during the checkout initialization.

= 4.0.5 - 2026-07-26 =

* Bump tested up to WordPress 7.0.2 and WooCommerce 10.9.4
* Fixed: Compatibility with theme Twenty Twenty-Five.
* Added: Compatibility with theme Talemy by ThemeSpirit
* Added: Compatibility with plugin Cart Abandonment Recovery Pro. Fix compatibility issues when using international phone fields with SMS or WhatsApp abandonment tracking.
* Improved: Compatibility with plugin WooCommerce Delivery & Pickup Date Time Pro (by CodeRockz).
* Improved: Update Fluid Checkout template files to the current latest versions from WooCommerce.
* Improved: Set allowed countries to specific international phone number fields using the field attribute `data-intl-tel-allowed-countries`.
* Fixed: Compatibility with plugin Delivery & Pickup Date Time for WooCommerce (by CodeRockz). Fix delivery information not being displayed correctly on the order pay page.
* Fixed: Compatibility with plugin Order Delivery for WooCommerce by Kestrel. Fix order delivery details fields not being displayed when local pickup method is selected. Move delivery details information to the appropriate section on the optimized order received page.
* Fixed: Compatibility with plugin Buy One Get One Free (by Oscar Gare). Fatal error when using version 6.0 and later of that plugin.
* Fixed: Compatibility with plugin Extra Product Options & Add-Ons for WooCommerce. Fixed Advanced Display mode breaking quantity updates on cart and checkout, removed duplicate edit options link on cart, and fixed empty option labels showing on order pages.
* Fixed: Layout and style issues when using the Split Design Template.
* Fixed: Billing address being hidden on the order pay page when positioned as a sub-step before the payment section.
* Fixed: Pickup point address not being displayed on the order pay page when a local pickup method is selected.
* Fixed: Billing address section not visible on checkout when using the billing address position "As a sub-step before/after the shipping address section" and the cart does not need shipping.

[See complete changelog](https://fluidcheckout.com/docs/changelog-fluid-checkout/)
