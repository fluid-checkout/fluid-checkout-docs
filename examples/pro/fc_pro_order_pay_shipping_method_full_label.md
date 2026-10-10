```php
add_filter( 'fc_pro_order_pay_shipping_method_full_label',
    /**
     * Add estimated delivery time to shipping method label.
     *
     * @param mixed $label Label text.
     * @param mixed $order_shipping_method The order shipping method.
     * @return mixed Filtered value.
     */
    function( $label, $order_shipping_method ) {
        $method_id = $order_shipping_method->get_method_id();

        if ( 'flat_rate' === $method_id ) {
            $label .= ' - ' . __( ' Delivery 3 to 5 business days after payment', 'text-domain' );
        }

        return $label;
    },
    10,
    2
);
```
