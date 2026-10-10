```php
add_filter( 'fc_gaa_google_autocomplete_js_settings',
    /**
     * Change the `localeComponents` settings to fill custom house number fields.
     * @param   array  $settings  JS settings object of the plugin.
     *
     * @param array $settings The Google Address Autocomplete settings array. Usually contains the following values:
     * @return array Filtered value.
     */
    function( $settings ) {
        // New locale components to merge
        $new_locale_components = array(
            'default' => array(
                'address_1' => array( 'route' ),
                'house_number' => array( 'street_number' ),
                'components_separator' => ', ',
            ),
            // Example to set changes to specific countries only
            // 'US' => array(
            //      'address_1' => array( 'route' ),
            //      'house_number' => array( 'street_number' ),
            //      'components_separator' => ', ',
            // ),
        );

        foreach ( $new_locale_components as $locale_key => $locale_settings ) {
            // Create locale settings if not existent
            if ( ! array_key_exists( $locale_key, $settings[ 'localeComponents' ] ) ) { $settings[ 'localeComponents' ][ $locale_key ] = array(); }

            // Merge settings
            $settings[ 'localeComponents' ][ $locale_key ] = array_merge( $settings[ 'localeComponents' ][ $locale_key ], $locale_settings );
        }

        return $settings;
    },
    10
);
```
