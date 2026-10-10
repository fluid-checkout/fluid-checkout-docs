```php
add_filter( 'fc_checkout_script_settings',
    /**
     * Customize checkout script settings.
     *
     * @param array $settings Settings to output.
     * @return array Filtered value.
     */
    function( $settings ) {
        $settings['customCheckoutOption'] = 'value';
        return $settings;
    },
    10
);
```
