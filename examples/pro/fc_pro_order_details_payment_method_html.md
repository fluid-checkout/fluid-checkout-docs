```php
add_filter( 'fc_pro_order_details_payment_method_html',
    /**
     * Add custom payment instructions.
     *
     * @param string $html The payment method HTML output.
     * @param WC_Order $order The order object.
     * @return string Filtered value.
     */
    function( $html, $order ) {
        // Add additional instructions for bank transfer
        if ( 'bacs' === $order->get_payment_method() ) {
            $custom_instructions = '<div class="custom-payment-notice">' . __( 'Please include your order number in the payment reference.', 'text-domain' ) . '</div>';
            $html = $custom_instructions . $html;
        }

        return $html;
    },
    10,
    2
);
```
