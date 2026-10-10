```php
add_filter( 'fc_pro_order_received_notice_classes',
    /**
     * Add status-specific class to order received notice.
     *
     * @param string $classes CSS classes. Default empty.
     * @param \WC_Order|false $order Order object.
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
