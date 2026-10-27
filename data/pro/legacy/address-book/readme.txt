Changelog section from the main readme of fluid-checkout/fc-address-book. The newest heading in that file was "== 3.1.6 - 2026-10-26 =" (two equals on the left). It is written here as "= 3.1.6 - 2026-10-26 =" so the docs parser keeps the release. The version, date, and notes are unchanged. Latest listed version is 3.1.6 (2026-10-26).

== Changelog ==

= 3.1.6 - 2026-10-26 =

* Added checks whether the plugin is active before loading it, preparing for the upcoming release of Lite and PRO 5.0.

= 3.1.5 - 2026-08-21 =

* Bump tested up to WordPress 7.1+
* Added: Compatibility with theme Sober (by Uixthemes).
* Improved: Show the Address Book plugin icon on admin notices.
* Improved: Support conditional visibility for admin settings fields.

= 3.1.4 - 2026-07-26 =

* Bump tested up to WordPress 7.0.2 and WooCommerce 10.9.4
* Fixed: Compatibility with theme Twenty Twenty-Five.
* Added: Compatibility with theme Talemy by ThemeSpirit.
* Improved: Sync all forked 3rd-party templates and JavaScript files with upstream sources.

= 3.1.3 - 2026-05-26 =

* Bump tested up to WordPress 7.0 and WooCommerce 10.8.0
* Fixed: Compatibility with plugin Cart Abandonment Recovery Pro. Issue with displaying GDPR notice at checkout, and integration with International Phone Numbers feature.

= 3.1.2 - 2026-04-21 =

* Improved: Update Fluid Checkout template files to the current latest versions from WooCommerce.

= 3.1.1 - 2026-04-07 =

* Bump tested up to WooCommerce 10.6.1
* Fixed: Compatibility with plugin Germanized for WooCommerce Pro. Fix fatal error caused by infinite loop when using the VAT ID fields from Germanized.

= 3.1.0 - 2026-03-10 =

* Bump tested up to WooCommerce 10.6.0
* Added: Allow saving addresses to the address book for new customer accounts created from checkout.
* Improved: Refactor various filter and action names and parameters, making them dynamic and easier to use
* Fixed: Create empty address book when a new user is registered to prevent issues with addresses migration count.

= 3.0.8 - 2026-02-26 =

* Bump tested up to WooCommerce 10.5.2
* Improved: Made the filter `fc_pro_shipping_address_book_before_entries` dynamic so it also works for billing with the filter `fc_pro_shipping_address_book_before_entries`.
* Fixed: Compatibility with plugin Germanized PRO. Prevent fatal errors when Germanized PRO is active but its features are not loaded because it is missing dependencies.

= 3.0.7 - 2025-12-05 =

* Bump tested up to WordPress 6.9 and WooCommerce 10.3.6
* Fixed: JavaScript errors triggered by inline scripts when minified.

= 3.0.6 - 2025-10-21 =

* Bump tested up to WooCommerce 10.2.2
* Added: Compatibility with theme Kiosko.
* Added: Compatibility with theme Listable.
* Added: Compatibility with theme Twenty Twenty-Two.
* Fixed: Compatibility with plugin Payment Plugins for PayPal WooCommerce. Fix payment processing error when using the plugin along with some other payment gateways.
* Fixed: String position marks in Serbian translations.

= 3.0.5 - 2025-08-17 =

* Bump tested up to WordPress 6.8.2 and WooCommerce 10.1.0
* Added: Compatibility with theme Bookshelf.
* Added: Compatibility with theme Cartzilla.
* Added: Compatibility with theme Ireca.
* Added: Compatibility with theme Sahel.
* Improved: Compatibility with theme Betheme.
* Fixed: Compatibility with plugin Payment Plugins for PayPal WooCommerce. Fix shipping information entered through express checkout window being lost during checkout process.

= 3.0.4 - 2025-06-10 =

* Bump tested up to WooCommerce 9.9.3
* Added: Compatibility with theme Twenty Twenty-Five.
* Added: Compatibility with theme Twenty Twenty-Four.
* Added: Compatibility with theme LeadEngine.
* Added: Compatibility with theme YITH Proteo.
* Added: Compatibility with plugin YITH WooCommerce Checkout Manager.
* Added: Filter hook `fc_pro_address_book_is_address_entry_valid_for_checkout` to allow developers to change whether an address should be available for use at checkout.
* Added: Filter hook `fc_address_book_entries_filtered_notice_message` to allow developers to change the text displayed when saved addresses are not available for checkout.
* Fixed: Compatibility plugin Dintero. Support for new popout and embed Dintero checkout flow options.
* Fixed: Compatibility with plugin Nets/Nexi Checkout (formerly Dibs). Fix integration with Redirect and Overlay checkout flow options.
* Fixed: RTL styles for compatibility with various themes and plugins.
* Fixed: Raw field values being displayed in substep review text when an address book entry is selected.

= 3.0.3 - 2025-03-17 =

* Bump tested up to WooCommerce 9.7.1
* Added: Automatic translations for all 83 languages supported by WordPress, and Deepl or Google Translate.
* Added: Compatibility with theme The7.

= 3.0.2 - 2025-02-24 =

* Bump tested up to WordPress 6.7.2 and WooCommerce 9.6.2
* Added: Compatibility with theme Motta.
* Fixed: Custom translation files from Loco Translate not loading correctly.

= 3.0.1 - 2025-01-07 =

* Bump tested up to WooCommerce 9.5.1
* Added: Compatibility with theme Loobek.
* Fixed: Fatal error when trying to change the translation file loaded for language variations on versions of WordPress prior to 6.6.0.

= 3.0.0 - 2024-12-11 =

* BREAKING CHANGES - Minimum required version for Fluid Checkout Lite is 4.0.0 and Fluid Checkout PRO is 3.0.0 for this add-on to work. Please make sure you update Fluid Checkout Lite to 4.0.0+ and Fluid Checkout PRO to 3.0.0+ to continue using this add-on.

* Bump tested up to WordPress 6.7.1 and WooCommerce 9.4.3
* Added: Integration with the Order Pay page feature from Fluid Checkout PRO.
* Added: Compatibility with theme Colibri WP.
* Added: Compatibility with plugin Germanized for WooCommerce Pro. Fix fatal error caused by infinite loop when using the VAT ID fields from Germanized.
* Fixed: How the plugin translation files are loaded. Fixes issue with WordPress 6.7 and Loco Translate not loading the correct translations.
* Removed: Support for older versions of Fluid Checkout PRO. Minimum version required for Fluid Checkout PRO is now 3.0.0.

= 2.0.18 - 2024-11-14 =

* Bump tested up to WordPress 6.7 and WooCommerce 9.4.1
* Added: Privacy data managers for customer address book entries.
* Added: Compatibility with theme Uncode.
* Improved: Display message for filtered saved addresses when customer has saved addresses but none of them are available to use at checkout.
* Fixed: Database error when trying to get address book count on multisite installations.

= 2.0.17 - 2024-10-10 =

* Bump tested up to WooCommerce 9.3.3
* Improved: Set all Javascript assets to be loaded at the page footer and defered for better page loading performance.

= 2.0.16 - 2024-09-12 =

* Bump tested up to WordPress 6.6.2 and WooCommerce 9.2.3
* Added: Compatibility with theme Porto.
* Added: Compatibility with plugin Woocommerce Side Cart Premium by XootiX.

= 2.0.15 - 2024-08-22 =

* Bump tested up to WordPress 6.6.1 and WooCommerce 9.2.1
* Added: Translation to Czeck (Czeck Republic).
* Added: Compatibility with theme Ocean WP.
* Added: Support for setting address book "same as" address source fields when trying to copy the address fields values to the other address group in the frontend.
* Improved: How compatibility with WooCommerce features is declared.
* Fixed: Change the way plugin compatibility classes are loaded to work also on multisite installations.

= 2.0.14 - 2024-06-20 =

* Bump tested up to WooCommerce 9.0.1
* Added: Compatibility with theme Ettore.
* Added: Compatibility with theme Fennik.
* Fixed: Use higher priority when setting address field values from the selected saved address.
* Fixed: Set checkboxes to save address for future purchases as checked by default when starting a new purchase.

= 2.0.13 - 2024-06-11 =

* Bump tested up to WordPress 6.5.4 and WooCommerce 8.9.3
* Added: Compatibility with theme Go.
* Added: Compatibility with theme Diza.
* Added: Compatibility with theme Kentha.
* Added: Compatibility with theme Beaver Builder Theme.
* Added: Compatibility with theme OnAir2.
* Fixed: Check whether current user is logged in before trying to set address values to a selected saved address.

= 2.0.12 - 2024-04-25 =

* Bump tested up to WordPress 6.5.2 and WooCommerce 8.8.2
* Added: Compatibility with theme The Gem.
* Fixed: Translations not being loaded correctly for language variations on WordPress 6.5+.

= 2.0.11 - 2024-03-27 =

* Bump tested up to WooCommerce 8.7.0
* Fixed: Missing styles for RTL languages, instead use the main file when the RTL file does not exist.

= 2.0.10 - 2024-03-07 =

* Improved: Stop update billing or shipping address data on checkout when changed on the customer account profile as it is not applicable when using the Address Book add-on.
* Improved: Rebuild button styles with changes from the Lite plugin.

= 2.0.9 - 2024-02-21 =

* Bump tested up to WooCommerce 8.6.1
* Added: Compatibility with theme Kosi.
* Added: Compatibility with theme BeTheme.
* Added: Compatibility with theme Iona.
* Added: Compatibility with plugin Nets Easy for WooCommerce by Krokedil (a.k.a Dibs Payments).
* Added: Compatibility with plugin Svea Checkout for WooCommerce by The Generation AB.

= 2.0.8 - 2024-02-02 =

* Bump tested up to WordPress 6.4.3 and WooCommerce 8.5.2
* Improved: Add process to automatically generate the installable zip file when creating a new version.

= 2.0.7 - 2024-01-23 =

* Bump tested up to WooCommerce 8.5.1
* Added: Compatibility with theme Smart Home.
* Added: Compatibility with theme Cartsy.
* Fixed: Styles for the address book source and entries checkboxes when using some 3rd-party plugins.

= 2.0.6 - 2024-01-03 =

* Bump tested up to WordPress 6.4.2 and WooCommerce 8.4.0
* Added: Support for billing address before shipping address on the checkout page.
* Added: Compatibility with theme BuddyBoss.

= 2.0.5 - 2023-11-21 =

IMPORTANT: This update fixes issues introduced with version 2.0.4 which may cause the shipping fields to be same as shipping in some circunstances where it should be different.

* Reverted: Set customer address from selected address book entries earlier for better compatibility with other plugins.
* Added: Compatibility with plugin WooCommerce Price Based on Country by Oscar Gare.
* Fixed: How selected address is passed to process checkout request.

= 2.0.4 - 2023-11-10 =

* Fixed: Set customer address from selected address book entries earlier for better compatibility with other plugins.
* Fixed: Styles for the selected address book entry when shipping or billing sections are highlighted.

= 2.0.3 - 2023-09-27 =

* Bump tested up to WordPress 6.3.1 and WooCommerce 8.1.1
* Added: Compatibility with plugin Dintero Checkout for WooCommerce by Krokedil.
* Added: Filter `fc_pro_address_book_address_sources_options` to allow changing the address book source option labels.
* Fixed: Styles for the address source items with classic and other design templates.

= 2.0.2 - 2023-09-13 =

* Bump tested up to WordPress 6.3 and WooCommerce 8.1
* Fixed: Box sizing attribute to use `border-box` for all address book elements.
* Fixed: Change how the plugin flushes URL rewrite rules (permalinks) to enable "delete" and "add" new addresses URLs.
* Improved: Add a way to set fields to force set value from the selected address book entry.

= 2.0.1 - 2023-07-18 =

* Bump tested up to WooCommerce 7.9
* Added: New feature to load the default customer address from saved addresses on the admin order edit screen.

= 2.0.0 - 2023-06-16 =

* Added: Moved the address book feature to this separate plugin, out of Fluid Checkout PRO.

[See complete changelog](https://fluidcheckout.com/docs/changelog-fc-address-book/)
