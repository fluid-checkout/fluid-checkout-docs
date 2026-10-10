```php
add_filter( 'fc_gaa_brasil_api_autocomplete_js_settings',
    /**
     * Modify Brasil API settings field mappings.
     *
     * @param array $settings The Brasil API settings array containing:
     * @return array Filtered value.
     */
    function( $settings ) {
        // Field mappings
        $settings['localeComponents'] = array(
            'state'        => 'state',
            'city'         => 'city',
            'address_1'    => 'street',
            'neighborhood' => 'neighborhood',
        );

        return $settings;
    },
    10
);
```
