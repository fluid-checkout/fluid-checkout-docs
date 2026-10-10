```php
add_filter( 'fc_checkout_validation_script_settings',
    /**
     * Customize validation script settings.
     *
     * @param array $settings Settings to output.
     * @return array Filtered value.
     */
    function( $settings ) {
        $settings['customValue'] = 'custom-value';
        return $settings;
    },
    10
);
```
