```php
add_filter( 'fc_pro_order_pay_is_same_address_data_before',
    /**
     * Force addresses to be considered different for specific payment methods.
     *
     * @param mixed $value Filtered value.
     * @param \WC_Order $order Order object.
     * @return mixed Filtered value.
     */
    function( $value, $order ) {
        // Force different for bank transfer
        if ( 'bacs' === $order->get_payment_method() ) {
            return false;
        }

        return $value;
    },
    10,
    2
);
```
