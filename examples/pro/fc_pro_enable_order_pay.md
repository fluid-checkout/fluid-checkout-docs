```php
add_filter( 'fc_pro_enable_order_pay',
    /**
     * Disable order pay feature.
     *
     * @param bool $is_enabled Whether the order pay feature is enabled. Default value comes from plugin settings.
     * @return bool Filtered value.
     */
    function( $is_enabled ) {
        return false;
    },
    10
);
```
