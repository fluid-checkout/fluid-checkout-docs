```php
add_filter( 'fc_pro_order_details_customer_billing_address_label',
    /**
     * Customize billing address label.
     *
     * @param string $label The billing address label. Default comes from checkout step configuration.
     * @param WC_Order $order The order object.
     * @return string Filtered value.
     */
    function( $label, $order ) {
        return __( 'Invoice Address', 'text-domain' );
    },
    10,
    2
);
```
