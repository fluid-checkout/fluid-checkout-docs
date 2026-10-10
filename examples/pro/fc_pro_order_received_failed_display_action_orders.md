```php
add_filter( 'fc_pro_order_received_failed_display_action_orders',
    /**
     * Hide My orders button on failed order pages.
     *
     * @param bool $display Whether to display order received failed display action orders. Default true.
     * @return bool Filtered value.
     */
    function( $display ) {
        return false;
    },
    10
);
```
