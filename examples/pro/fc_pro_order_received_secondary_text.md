```php
add_filter( 'fc_pro_order_received_secondary_text',
    /**
     * Customize secondary text based on order status.
     *
     * @param string $text Text. Default empty.
     * @param \WC_Order $order Order object.
     * @return string Filtered value.
     */
    function( $text, $order ) {
        if ( 'on-hold' === $order->get_status() ) {
            return __( 'We will process your order as soon as your payment is confirmed. Follow the steps below to complete it.', 'text-domain' );
        }
        return $text;
    },
    100,
    2
);
```
