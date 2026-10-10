```php
add_filter( 'fc_pro_order_pay_shipping_method_substep_text_shipping_method_label',
    /**
     * Add prefix to shipping method label.
     *
     * @param string $label The shipping method label.
     * @param int $order_shipping_id The shipping method ID.
     * @param WC_Order_Item_Shipping $order_shipping_method The shipping method item object.
     * @param WC_Order $order The order object.
     * @return string Filtered value.
     */
    function( $label, $order_shipping_id, $order_shipping_method, $order ) {
        // Add prefix to label
        $label = 'Shipping via ' . $label;
        return $label;
    },
    10,
    4
);
```
