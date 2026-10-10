=== Fluid Checkout for WooCommerce - PRO ===
Contributors: diegoversiani
Tags: woocommerce, checkout, conversion, multi-step, one-page
Requires PHP: 7.4
Requires at least: 5.0
Tested up to: 7.1
Stable tag: 4.0.6
License: GPLv3 or later
License URI: https://www.gnu.org/licenses/gpl-3.0.html

An even better Fluid Checkout experience for any WooCommerce store. The PRO version provides your store with optimized Cart and Order Received pages, account matching, edit cart items at checkout, and more to come.

== Description ==

An even better Fluid Checkout experience for any WooCommerce store. The PRO version provides your store with optimized Cart and Order Received pages, account matching, edit cart items at checkout, and more to come.

== Installation ==

= Minimum Requirements =

* PHP version 7.4 or later

= Automatic installation =

Log in to your WordPress dashboard, navigate to the Plugins menu and click Add New.

Press the "Upload Plugin" and select the zip file, then click "Install Now".

= Manual installation =

1. Upload Fluid Checkout for WooCommerce - PRO to the `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. All done.


== Changelog ==

= 4.0.6 - 2026-08-19 =

* Bump tested up to WordPress 7.1+
* Added: Compatibility with theme Sober (by Uixthemes).
* Added: Compatibility with plugin B2BKing.
* Added: Compatibility with plugin Order Delivery Date Pro for WooCommerce by Tyche Softwares.
* Improved: Update replacement files for Revolut Gateway for WooCommerce.
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

= 4.0.4 - 2026-05-26 =

* Bump tested up to WordPress 7.0 and WooCommerce 10.8.0
* Improved: Allow opening the order summary popup/dropdown on the cart page when using the distraction free header template in the same way as on the checkout page.
* Fixed: Show shipping costs on cart page when option to hide shipping at cart is selected but there are already shipping costs applied to the cart.

= 4.0.3 - 2026-04-23 =

* Improved: Add CSS variables for product image sizes on the cart page.
* Fixed: Compatibility with plugin WooCommerce PayPal Payments. Fix place order button disabled on the order pay page.
* Fixed: Non-logged user verification for order pay page. Additional fixes.

= 4.0.2 - 2026-04-21 =

* Improved: Update Fluid Checkout template files to the current latest versions from WooCommerce.
* Fixed: Non-logged user verification for order pay page.

= 4.0.1 - 2026-04-07 =

* Bump tested up to WooCommerce 10.6.1
* Improved: Update international phone number code library (intl-tel-input) to its latest available version.
* Fixed: Compatibility with plugin WooCommerce Smart Coupons. Fix coupons section alignment when using the split design template.
* Fixed: Compatibility with plugin Authorize.net. Fix width of express payment buttons.
* Fixed: Order summary layout issue when displayed in the sidebar on the order received page.
* Fixed: Alignment of the progress bar with the content section on one-column layout when also using the minimalist design template.
* Fixed: Always replace the account creation fragment to prevent it from staying visible when an account match is found for the email provided.
* Fixed: Distraction free header staying offset when WP admin bar is scrolled out of view on the cart page.

= 4.0.0 - 2026-03-10 =

* BREAKING CHANGES - Minimum required version for Fluid Checkout Lite is 4.2.0 for this add-on to work. Please make sure you update Fluid Checkout Lite to 4.2.0+ to continue using this add-on.

* Bump tested up to WooCommerce 10.6.0
* Added: New feature for displaying order summary before the checkout steps on mobile devices on the checkout and order pay pages.
* Added: New feature for one column layout on checkout, cart and order pay pages.
* Added: New feature for precise international phone number validation.
* Fixed: International phone number validation behavior on page load.
* Fixed: Fatal error in rare cases when using the Local Pickup feature and the Address Book add-on.

[See complete changelog](https://fluidcheckout.com/docs/changelog-fluid-checkout/)


