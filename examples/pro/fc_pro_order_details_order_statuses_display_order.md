```php
add_filter( 'fc_pro_order_details_order_statuses_display_order',
    /**
     * Customize status display order for subscription orders.
     *
     * @param array $status_order Array of order status keys in display order.
     * @param WC_Order $order The order object.
     * @return array Filtered value.
     */
    function( $status_order, $order ) {
        // Completed before other statuses
        return array( 'wc-completed', 'wc-pending', 'wc-processing' );
    },
    10,
    2
);
```
