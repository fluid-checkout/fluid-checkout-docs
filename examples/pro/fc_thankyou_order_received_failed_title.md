```php
add_filter( 'fc_thankyou_order_received_failed_title',
    /**
     * Customize failed order title.
     *
     * @param string $title Title text.
     * @param \WC_Order $order Order object.
     * @return string Filtered value.
     */
    function( $title, $order ) {
        return __( 'Payment Unsuccessful', 'text-domain' );
    },
    10,
    2
);
```
