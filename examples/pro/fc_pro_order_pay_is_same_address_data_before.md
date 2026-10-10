```php
add_filter( 'fc_pro_order_pay_is_same_address_data_before',
    /**
     * Force addresses to be considered different for specific payment methods.
     *
     * @param bool|null $is_same Whether addresses are the same. Defaults to null (will be calculated).
     * @param WC_Order $order The order object.
     * @return bool|null Filtered value.
     */
    function( $is_same, $order ) {
        // Force different for bank transfer
        if ( 'bacs' === $order->get_payment_method() ) {
            return false;
        }

        return $is_same;
    },
    10,
    2
);
```
