```php
add_filter( 'fc_pro_order_details_display_shipping_status',
    /**
     * Enable shipping status display globally.
     *
     * @param bool $display_shipping Whether to display shipping status. Defaults to false.
     * @return bool Filtered value.
     */
    function( $display_shipping ) {
        return true;
    },
    10
);
```
