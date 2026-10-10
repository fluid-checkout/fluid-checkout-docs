```php
add_filter( 'fc_pro_order_received_notice_classes',
    /**
     * Add status-specific class to order received notice.
     *
     * @param string $classes Space-separated CSS classes.
     * @param WC_Order $order The order object.
     * @return string Filtered value.
     */
    function( $classes, $order ) {
        $classes .= ' order-status-' . $order->get_status();
        return $classes;
    },
    10,
    2
);
```
