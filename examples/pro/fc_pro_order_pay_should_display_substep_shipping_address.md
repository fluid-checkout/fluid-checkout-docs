```php
add_filter( 'fc_pro_order_pay_should_display_substep_shipping_address',
    /**
     * Hide shipping substep on order pay page.
     *
     * @param mixed $should_render The should render.
     * @param \WC_Order $order Order object.
     * @param string $context Context in which the check runs, such as order-pay or order-received.
     * @return mixed Filtered value.
     */
    function( $should_render, $order, $context ) {
        return false;
    },
    10,
    3
);
```
