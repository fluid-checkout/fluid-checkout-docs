```php
add_filter( 'fc_pro_order_pay_should_display_substep_shipping_address',
    /**
     * Hide shipping substep on order pay page.
     *
     * @param bool $should_render Whether to display the shipping address substep.
     * @param WC_Order $order The order object.
     * @param string $context The context where this check is being performed.
     * @return bool Filtered value.
     */
    function( $should_render, $order, $context ) {
        return false;
    },
    10,
    3
);
```
