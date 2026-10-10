```php
add_filter( 'fc_pro_order_pay_move_order_notes_substep',
    /**
     * Change order notes position.
     *
     * @param mixed $should_move The should move.
     * @param \WC_Order $order Order object.
     * @return mixed Filtered value.
     */
    function( $should_move, $order ) {
        return true;
    },
    10,
    2
);
```
