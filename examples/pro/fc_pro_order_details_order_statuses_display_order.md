```php
add_filter( 'fc_pro_order_details_order_statuses_display_order',
    /**
     * Customize status display order for subscription orders.
     *
     * @param mixed $value Filtered value.
     * @param \WC_Order $order Order object.
     * @return mixed Filtered value.
     */
    function( $value, $order ) {
        // Completed before other statuses
        return array( 'wc-completed', 'wc-pending', 'wc-processing' );
    },
    10,
    2
);
```
