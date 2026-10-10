```php
add_filter( 'fc_pro_cart_ajax_settings',
    /**
     * Add custom AJAX setting to cart.
     *
     * @param array $settings Settings.
     * @return array Filtered value.
     */
    function( $settings ) {
        $settings['customSetting'] = 'custom_value';
        return $settings;
    },
    10
);
```
