```php
add_filter( 'fc_pro_enable_order_details_wide_layout',
    /**
     * Force wide layout for all orders.
     *
     * @param bool $is_enabled Whether the wide layout is enabled. Default value comes from plugin settings.
     * @return bool Filtered value.
     */
    function( $is_enabled ) {
        return true;
    },
    10
);
```
