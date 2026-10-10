```php
add_filter( 'fc_pro_order_details_customer_billing_address_label',
    /**
     * Customize billing address label.
     *
     * @param mixed $label Label text.
     * @param WC_Order $order Order object.
     * @return mixed Filtered value.
     */
    function( $label, $order ) {
        return __( 'Invoice Address', 'text-domain' );
    },
    10,
    2
);
```
