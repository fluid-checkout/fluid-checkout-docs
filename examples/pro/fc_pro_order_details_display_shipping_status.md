```php
add_filter( 'fc_pro_order_details_display_shipping_status',
    /**
     * Enable shipping status display globally.
     *
     * @param bool $display Whether to display order details display shipping status. Default false.
     * @return bool Filtered value.
     */
    function( $display ) {
        return true;
    },
    10
);
```
