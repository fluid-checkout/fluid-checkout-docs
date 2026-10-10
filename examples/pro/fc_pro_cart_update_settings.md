```php
add_filter( 'fc_pro_cart_update_settings',
    /**
     * Customize cart update settings.
     *
     * @param array $settings Array of cart update settings.
     * @return array Filtered value.
     */
    function( $settings ) {
        $settings['customSetting'] = 'custom_value';
        return $settings;
    },
    10
);
```
