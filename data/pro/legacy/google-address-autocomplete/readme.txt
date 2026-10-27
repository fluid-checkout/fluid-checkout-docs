Changelog section from the main readme of fluid-checkout/fc-google-address-autocomplete. The newest heading in that file was "== 2.3.1 - 2026-10-26 =" (two equals on the left). It is written here as "= 2.3.1 - 2026-10-26 =" so the docs parser keeps the release. The version, date, and notes are unchanged. Latest listed version is 2.3.1 (2026-10-26). The Upgrade Notice section is not included.

== Changelog ==

= 2.3.1 - 2026-10-26 =

* Added checks whether the plugin is active before loading it, preparing for the upcoming release of Lite and PRO 5.0.

= 2.3.0 - 2026-07-26 =

* Bump tested up to WordPress 7.0.2 and WooCommerce 10.9.4
* Added: Validation of the Google API Key in the plugin settings.
* Added: Setup wizard with guided steps to configure Google API Key.

= 2.2.8 - 2026-01-06 =

* Bump tested up to WooCommerce 10.5.2
* Fixed: Address suggestions box reopening after selecting an address for autocompletion.

= 2.2.7 - 2025-12-05 =

* Bump tested up to WordPress 6.9 and WooCommerce 10.3.6
* Improved: Adjust the delay to trigger autocomplete requests while the user types in the autocomplete fields.
* Improved: Check for attribute `data-skip-autocomplete` and skip fields setting new value from autocomplete when attribute is present.
* Fixed: Do not change placeholder text to avoid displaying instructions on fields that are not editable.
* Fixed: JavaScript errors triggered by inline scripts when minified.

= 2.2.6 - 2025-10-21 =

* Bump tested up to WooCommerce 10.2.2
* Added: Add filter `fc_gaa_display_legacy_api_settings` to enable display legacy API settings.
* Improved: Change default results types for Places API (New), as not passing result types yields better matching address suggestions.
* Improved: Do not trigger autocomplete when focusing on `readonly` fields.
* Fixed: String position marks in Serbian translations.
* Fixed: Autocomplete features not working on admin edit order screens when using HPOS (custom order tables).

= 2.2.5 - 2025-08-17 =

* Bump tested up to WordPress 6.8.2 and WooCommerce 10.1.0
* Improved: Add small delay to run initialization of autocomplete fields to ensure the field is ready.

= 2.2.4 - 2025-06-10 =

* Improved: Add subpremise to the `address_2` field for addresses in the USA.
* Fixed: RTL styles for compatibility with various themes and plugins.

= 2.2.3 - 2025-05-03 =

* Bump tested up to WordPress 6.8.1 and WooCommerce 9.8.3
* Improved: How settings tabs and sections are added for better compatibility with other Fluid Checkout add-ons and plugins.
* Improved: Translations in Lithuanian.

= 2.2.2 - 2025-04-15 =

* Bump tested up to WooCommerce 9.8.1
* Improved: Rename inline validation message classes to avoid conflicts with other plugins.
* Improved: Add value mappings for Croatian Counties.
* Fixed: Hide radio buttons on suggestions list for some themes.

= 2.2.1 - 2025-03-17 =

* Bump tested up to WooCommerce 9.7.1
* Added: Automatic translations for all 83 languages supported by WordPress, and Deepl or Google Translate.
* Improved: Optmize delays to trigger autocomplete requests for better user experience.
* Improved: Add value mappings for German States.

= 2.2.0 - 2025-03-05 =

* Bump tested up to WooCommerce 9.7.1
* Added: Support for the Google Places API (New), and set it as the default API version for new installations.
* Fixed: Company input fields should not have autocomplete search when autocompletion for the company field is disabled.

= 2.1.1 - 2025-02-24 =

* Bump tested up to WordPress 6.7.2 and WooCommerce 9.6.2
* Fixed: Custom translation files from Loco Translate not loading correctly.
* Fixed: Fatal error when trying to change the translation file loaded for language variations on versions of WordPress prior to 6.6.0.

= 2.1.0 - 2024-12-11 =

* Bump tested up to WordPress 6.7.1 and WooCommerce 9.4.3
* Added: Google Autocomplete feature on the admin edit order pages.
* Added: Compatibility with plugin States, Cities, and Places for WooCommerce.
* Fixed: How the plugin translation files are loaded. Fixes issue with WordPress 6.7 and Loco Translate not loading the correct translations.

= 2.0.8 - 2024-11-14 =

* Bump tested up to WordPress 6.7 and WooCommerce 9.4.1
* Added: Trigger custom Javascript event `fc_gaa_address_autocompleted` when finishing autocompleting an address. Passes the place data in the event detail object.
* Improved: Compatibility with plugin MyParcel. Trigger MyParcel update when finishing autocompleting an address.
* Fixed: Javascript error when trying to restore autocomplete attributes for affected fields.

= 2.0.7 - 2024-10-10 =

* Bump tested up to WordPress 6.6.2 and WooCommerce 9.3.3
* Improved: For addresses in Spain, autofill subpremise values to the `address_2` field.
* Improved: Set all Javascript assets to be loaded at the page footer and defered for better page loading performance.
* Improved: Change hook used to run database migrations on first activation.
* Fixed: Integration with plugin My Parcel when option to use custom split address fields is disabled.

= 2.0.6 - 2024-08-22 =

* Bump tested up to WordPress 6.6.1 and WooCommerce 9.2.1
* Improved: How compatibility with WooCommerce features is declared.
* Improved: Added the value for the setting `addressFieldsSelector` so it can be easily modified with PHP code.
* Fixed: Do not apply database migrations when activating the plugin on a multisite installation.
* Fixed: Change the way plugin compatibility classes are loaded to work also on multisite installations.

= 2.0.5 - 2024-06-11 =

* Bump tested up to WordPress 6.5.4 and WooCommerce 8.9.3
* Added: Compatibility with plugin Siteground Speed Optimizer.

= 2.0.4 - 2024-04-25 =

* Bump tested up to WordPress 6.5.2 and WooCommerce 8.8.2
* Added: Compatibility with plugin MyParcel.
* Improved: Automatically apply database migrations on first plugin installation, showing the message for database migration available only when updating the plugin.
* Fixed: Translations not being loaded correctly for language variations on WordPress 6.5+.

= 2.0.3 - 2024-03-27 =

* Bump tested up to WooCommerce 8.7.0
* Added: Compatibility with the WooCommerce Checkout Block.
* Added: New option to choose which version of the Brasil API CEP methods to be used when using autocomplete from CEP field. Only applicable to Brazilian addresses.
* Added: compatibility with plugin MkRapel Regiones y Ciudades de Chile para WC.
* Added: Partial compatibility with plugin States, Cities, and Places for WooCommerce.
* Improved: Set default version for the Brasil API CEP methods to "Version 1" as it seems to be more stable.
* Improved: Filter the `localeFieldValueMapping` and `localeComponents` settings outputting only values for allowed countries, improving performance by avoiding transmitting unnecessary data.
* Improved: Use case insensitive comparison for field values returned from the Google APIs with existing values in dropdown fields.
* Improved: Support for state field in various countries, too many to list here.
* Improved: Use functions to determine the URL of scripts and styles from this plugin.
* Fixed: Address data component used for the City field in various countries, too many to list here.

= 2.0.2 - 2024-02-21 =

* Bump tested up to WooCommerce 8.6.1
* Added: Support for enhanced dropdown fields from Fluid Checkout Lite.

= 2.0.1 - 2024-02-02 =

* Bump tested up to WordPress 6.4.3 and WooCommerce 8.5.2
* Improved: Compatibility with plugin Colissimo shipping methods for WooCommerce. Set local variables from hooks early so it is detected even if hooks are removed.
* Improved: Add process to automatically generate the installable zip file when creating a new version.

= 2.0.0 - 2024-01-03 =

IMPORTANT CHANGE: Moved the plugin settings page to "WP Admin > WooCommerce > Settings > Fluid Checkout > Address Autocomplete" to make it consistent with other Fluid Checkout add-ons.

* Added: Compatibility with plugin WooCommerce NL Postcode Checker by WP Overnight.
* Added: New filter `fc_gaa_use_field_description_for_instructions` to use field description instead of placeholder text to show instructions "Start typing ...".
* Improved: Moved the plugin settings page to "WP Admin > WooCommerce > Settings > Fluid Checkout > Address Autocomplete" to make it consistent with other Fluid Checkout add-ons.

= 1.2.7 - 2023-12-14 =

* Bump tested up to WordPress 6.4.2 and WooCommerce 8.4.0
* Added: New option to show/hide the Google logo and text "Powered by Google".
* Improved: Functions to remove duplicate Google Maps scripts to account for edge cases and multiple callback functions.
* Removed: Compatibility class with the plugin Shipmondo as it does not seem to be needed anymore.

= 1.2.6 - 2023-11-10 =

* Added: Compatibility with plugin Botiga PRO.
* Improved: Set focus to the next focusable element after selecting an address from the suggested addresses.
* Fixed: Trigger `validate` event after setting new field values.

= 1.2.5 - 2023-09-13 =

* Bump tested up to WordPress 6.3 and WooCommerce 8.1
* Added: Compatibility with plugin WooCommerce Checkout Field Editor PRO by ThemeHigh.

= 1.2.4 - 2023-08-04 =

* Added: Compatibility with plugin Colissimo shipping methods for WooCommerce.
* Added: Load scripts with `defer` attribute when using WordPress 6.3+
* Improved: Change the way duplicate Google Maps scripts are handled, when added by other plugins. Removes duplicate Google Maps scripts, preserving any parameters and dependencies.
* Improved: Support for state field in Mexico.

= 1.2.3 - 2023-05-29 =

* Bump tested up to WooCommerce 7.7.0
* Added: New option to define language of Google Places API search interface and address data returned.
* Added: Compatibility with plugin Litespeed Cache. Excludes Google Maps APIs and the Google Address autocomplete scripts from optimizations.
* Improved: Output JS settings object directly to the page head element without being associated with enqueued scripts.
* Removed: Hook `fc_gaa_settings_script_localization_handle` because JS settings object is now output directly to the page head element.

= 1.2.2 - 2023-04-21 =

* Bump tested up to WooCommerce 7.6.0
* Improved: Revert to execute scripts on `load` instead of page `DOMContentLoaded` for better compatibility. Most notably with Cloudflare Rocket Loader.
* Fixed: Reset address search input placeholder after checkout fragments are updated and after country has been changed.

= 1.2.1 - 2023-04-06 =

* Bump tested up to WordPress 6.2 and WooCommerce 7.5.1
* Added: Compatibility with theme Divi when using the theme's custom sections for the checkout page.
* Reverted: Set focus back to the search field when an address is selected. This was causing the search box to stay open after selection, blocking the view of other fields and sections.

= 1.2.0 - 2023-03-13 =

* Added: New feature to autocomplete the company field when the information is available for the selected address.
* Added: New feature to allow searching for businesses in the company field.
* Added: Translation to Durch, French, German, Italian, Polish, Portuguese, Spanish, Swedish and Turkish.
* Improved: Set focus back to the search field when an address is selected.
* Fixed: State field not updated correctly when newly selected address is on a different country.
* Fixed: Do not trigger Brasil API autocomplete when field value has not changed yet.

= 1.1.19 - 2023-03-08 =

* Bump tested up to WooCommerce 7.4.1
* Improved: Add security check to dismiss admin notice links and fix related PHP 8.1 deprecated notices.
* Improved: Address mapping for Denmark addresses, adding `subpremise` to the `address_1` field.

= 1.1.18 - 2023-01-03 =

* Bump tested up to WooCommerce 7.2.2
* Improved: Execute script on `DOMContentLoaded` instead of page `load` event to enable interactive elements earlier.
* Improved: Address mapping for New Zealand addresses, use `sublocality_level_1` for the City field if it is available, otherwise use `locality` which is the default data used for the City field.

= 1.1.17 - 2022-12-05 =

* Fixed: State field not autocompleting for addresses in New Zealand after change to values on WooCommerce 7.1.0.

= 1.1.16 - 2022-11-21 =

* Bump tested up to WordPress 6.1.1 and WooCommerce 7.1.0
* Added: Compatibility with the WooCommerce HPOS (High Performance Order Storage).
* Improved: Changed labels and clarified descriptions of some plugin settings.
* Fixed: Brasil API feature conditionals depending on the Google Address Autocomplete feature to be enabled. Now you won't need to enter a Google API key to use only the Brasil API autocomplete feature.

= 1.1.15 - 2022-10-28 =

* Bump tested up to WordPress 6.0.3 and WooCommerce 7.0.0
* Improved: Only add extra field components and separators when they return a value from the Google Places API.
* Improved: Add mapping for sublocality components from the Google Places API.
* Improved: Better performance while loading plugin and theme compatibility classes on websites with a big database. Replaced use of options (from database) with filter hooks.

= 1.1.14 - 2022-07-12 =

* Bump tested versions to WP 6.0 and WC 6.6.1.
* Fixed: Autofill "County" field for addresses in the UK.

= 1.1.13 - 2022-06-09 =

* Added: New feature to replace the address field placeholder text.
* Improved: Add default Google Address Autocomplete locale component settings to the JS settings from PHP to allow for easier customizations.

= 1.1.12 - 2022-05-24 =

* Improved: Do not load scripts on the Order Received page.

= 1.1.11 - 2022-05-17 =

* Added: New JS option `defaultLocale` for Google Address Autocomplete to set the default country for when Google Places API does not return the country value.
* Improved: Show admin notices for required plugins when Fluid Checkout is not activated.
* Improved: Detect if WooCommerce is already installed and show an activation link on the required plugin notice.

= 1.1.10 - 2022-05-12 =

* Bump tested versions to WP 5.9.3 and WC 6.4.1.
* Added: New hook `fc_gaa_google_places_api_language` to let developers change the language used by the Google Places API.
* Added: New hook `fc_gaa_settings_script_localization_handle` to let developers change the script handle to attach the plugin JS settings object when the `woocommerce` script is not available.
* Added: New hook `fc_gaa_google_places_api_url_parameters` to let developers change the parameters for the Google Maps API URL.
* Added: New hook `fc_gaa_google_places_api_script_dependencies` to let developers change the enqueue dependencies for the Google Maps API script.
* Added: Compatibility with plugin Shipmondo.
* Improved: Try to prevent enqueuing duplicate Google Maps API scripts.
* Improved: Change enqueue hook priority to `100` for better compatibility with plugins, previously value was `10`.
* Improved: Change the way `change` event for select2 fields is triggered to avoid JS errors if the `select2` function is not completely loaded.
* Improved: Use original value for mapped fields when a mapped value is not available.
* Improved: Do not validate allowed countries when country field is hidden, ie. when selling or shipping to only one country.

= 1.1.9 - 2022-05-09 =

* Fixed: JS error preventing address fields from being completed when State field is missing.

= 1.1.8 - 2022-04-12 =

* Improved: Change the way checkout fields arguments are changed to follow Fluid Checkout standards.

= 1.1.7 - 2022-02-24 =

* Fixed: JS error preventing the address suggestings from working when country field is missing in one or more field groups.

= 1.1.6 - 2022-02-15 =

* Fixed: JS error while trying to set a value for the State field when the field value was not returned by the Google Places API.

= 1.1.5 - 2022-02-07 =

* Bump tested versions to WP 5.9 and WC 6.1.
* Improved: Support for province/region and neighborhood field in Turkey.

= 1.1.4 - 2022-02-01 =

* Improved: Support for addresses with sub-premise and regions in Australia.

= 1.1.3 - 2022-01-19 =

* Improved: Support for addresses with sub-premise and regions in New Zealand.

= 1.1.2 - 2021-12-20 =
* Bump minimum required version to PHP 7.4.
* Added: Use fallback values from Google Maps API when original field data is missing.
* Improved: Trigger checkout update event after address fields are autocompleted for Google Maps API and Brasil API.
* Improved: Added support and license key activation links on the plugins list.
* Improved: Show success message when a license key is activated successfully.
* Fixed: Fix missing city value for some locations. For instance, all addresses in "Brooklyn - NY".

= 1.1.1 - 2021-11-05 =
* Removed: License verification preventing plugin settings from appearing after saving license key.

= 1.1.0 - 2021-11-01 =
* Added: New feature to allow the use of the Brasil API to autofill address from CEP/Postcode field.
* Improved: License key validation messages.

= 1.0.1 - 2021-09-25 =
* Added: New option to choose the types of search results to return from the Google Places API search. Allows enabling search by zip code. Defaults to "Precise addresses".
* Added: New option to enable "Debug mode". When enabled, the selected "Place" details will be logged to the browser console.
* Added: Compatibility with the plugin "Brazilian Market on WooCommerce - by Claudio Sanches".
* Fixed: Target only real form fields when looking for fields to fill, instead of looking only for the element `id`.

= 1.0.0 - 2021-09-20 =
* First public release.
