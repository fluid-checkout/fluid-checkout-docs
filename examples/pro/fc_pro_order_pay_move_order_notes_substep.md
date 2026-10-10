```php
add_filter( 'fc_pro_order_pay_move_order_notes_substep',
    /**
     * Change order notes position.
     *
     * @param bool $should_move Whether to move the order notes substep.
     * @param WC_Order $order The order object.
     * @return bool Filtered value.
     */
    function( $should_move, $order ) {
        return true;
    },
    10,
    2
);
```
