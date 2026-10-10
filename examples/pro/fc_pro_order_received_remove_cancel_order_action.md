```php
add_filter( 'fc_pro_order_received_remove_cancel_order_action',
    /**
     * Keep cancel order action on order received page.
     *
     * @param string $value Filtered value. Default 'yes'.
     * @return string Filtered value.
     */
    function( $value ) {
        return 'no';
    },
    10
);
```
