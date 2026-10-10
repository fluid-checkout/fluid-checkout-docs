```php
add_filter( 'fc_pro_order_details_overview_payment_method_title',
    /**
     * Customize payment method title for bank transfers.
     *
     * @param string $title The payment method title.
     * @param WC_Order $order The order object.
     * @return string Filtered value.
     */
    function( $title, $order ) {
        // Check if payment method is bank transfer (BACS)
        if ( $order->get_payment_method() === 'bacs' ) {
            return $title . ' ' . __( '(Awaiting Payment)', 'text-domain' );
        }

        return $title;
    },
    10,
    2
);
```
