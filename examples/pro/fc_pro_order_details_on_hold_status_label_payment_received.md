```php
add_filter( 'fc_pro_order_details_on_hold_status_label_payment_received',
    /**
     * Customize payment received label.
     *
     * @param string $label The payment received label. Defaults to “Payment received”.
     * @return string Filtered value.
     */
    function( $label ) {
        return __( 'Payment confirmed', 'text-domain' );
    },
    10
);
```
