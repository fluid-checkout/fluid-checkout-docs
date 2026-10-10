```php
add_filter( 'fc_pro_order_details_payment_method_html',
    /**
     * Add custom payment instructions.
     *
     * @param mixed $paymenth_method_html The paymenth method html.
     * @param \WC_Order $order Order object.
     * @return mixed Filtered value.
     */
    function( $paymenth_method_html, $order ) {
        // Add additional instructions for bank transfer
        if ( 'bacs' === $order->get_payment_method() ) {
            $custom_instructions = '<div class="custom-payment-notice">' . __( 'Please include your order number in the payment reference.', 'text-domain' ) . '</div>';
            $paymenth_method_html = $custom_instructions . $paymenth_method_html;
        }

        return $paymenth_method_html;
    },
    10,
    2
);
```
