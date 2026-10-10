```php
add_filter( 'fc_pro_order_received_remove_cancel_order_action',
    /**
     * Keep cancel order action on order received page.
     *
     * @param string $remove_action Whether to remove the action. Defaults to ‘yes’.
     * @return string Filtered value.
     */
    function( $remove_action ) {
        return 'no';
    },
    10
);
```
