```php
add_filter( 'fc_pro_order_details_customer_shipping_address_label',
    /**
     * Change label to "Delivery Address".
     *
     * @param string $label The shipping address label. Default comes from checkout step configuration.
     * @param WC_Order $order The order object.
     * @return string Filtered value.
     */
    function( $label, $order ) {
        return __( 'Delivery Address', 'text-domain' );
    },
    10,
    2
);
```
