```php
add_filter( 'fc_pro_order_pay_page_title',
    /**
     * Customize order pay page title.
     *
     * @param string $title The page title. Defaults to “Pay for order”.
     * @param WC_Order $order The order object.
     * @return string Filtered value.
     */
    function( $title, $order ) {
        return sprintf( __( 'Complete Payment for Order #%s', 'text-domain' ), $order->get_order_number() );
    },
    10,
    2
);
```
