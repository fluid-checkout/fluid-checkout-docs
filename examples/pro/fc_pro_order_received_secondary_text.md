```php
add_filter( 'fc_pro_order_received_secondary_text',
    /**
     * Customize secondary text based on order status.
     *
     * @param string $secondary_text The secondary text.
     * @param WC_Order $order The order object.
     * @return string Filtered value.
     */
    function( $secondary_text, $order ) {
        if ( 'on-hold' === $order->get_status() ) {
            return __( 'We will process your order as soon as your payment is confirmed. Follow the steps below to complete it.', 'text-domain' );
        }
        return $secondary_text;
    },
    100,
    2
);
```
