```php
add_filter( 'fc_gaa_settings',
    /**
     * Change the frontend JavaScript settings object.
     *
     * @param array $settings The JavaScript settings array containing version, paths, URLs, and other configuration options and specific scripts settings. Defaults to an array with:
     * @return array Filtered value.
     */
    function( $settings ) {
            // Google Address Autocomplete settings
            $settings[ 'googleAutoCompleteSettings' ] = array(
                'debugMode' => true,
            );

            // Brasil API settings
            $settings[ 'brasilAPISettings' ] = array(
                'debugMode' => true,
                'brasilApiURL' => '
        https://brasilapi.com.br/api/cep/v2/{cep}
        ',
            );

            return $settings;
    },
    10
);
```
