```php
add_filter( 'fc_checkout_coupons_script_settings',
    /**
     * Add custom JavaScript settings for coupons.
     *
     * @param array $settings Settings to output.
     * @return array Filtered value.
     */
    function( $settings ) {
        $settings['customSetting'] = 'value';
        return $settings;
    },
    10
);
```
