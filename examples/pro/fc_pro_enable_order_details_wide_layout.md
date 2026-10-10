```php
add_filter( 'fc_pro_enable_order_details_wide_layout',
    /**
     * Force wide layout for all orders.
     *
     * @param bool $enabled Whether order details use the wide layout.
     * @return bool Filtered value.
     */
    function( $enabled ) {
        return true;
    },
    10
);
```
