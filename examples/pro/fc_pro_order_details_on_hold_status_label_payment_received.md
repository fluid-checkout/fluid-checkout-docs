```php
add_filter( 'fc_pro_order_details_on_hold_status_label_payment_received',
    /**
     * Customize payment received label.
     *
     * @param string $value Filtered value.
     * @return string Filtered value.
     */
    function( $value ) {
        return __( 'Payment confirmed', 'text-domain' );
    },
    10
);
```
