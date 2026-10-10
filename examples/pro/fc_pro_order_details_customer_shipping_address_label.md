```php
add_filter( 'fc_pro_order_details_customer_shipping_address_label',
    /**
     * Change label to "Delivery Address".
     *
     * @param mixed $label Label text.
     * @param \WC_Order $order Order object.
     * @return mixed Filtered value.
     */
    function( $label, $order ) {
        return __( 'Delivery Address', 'text-domain' );
    },
    10,
    2
);
```
