```php
add_action( 'fc_order_summary_cart_item_totals_before',
    /**
     * Add cart totals header.
     *
     * @param array $cart_item Cart item data.
     * @param string $cart_item_key Cart item key.
     * @param WC_Product $_product Product object.
     */
    function( $cart_item, $cart_item_key, $_product ) {
        echo '<div>Product total</div>';
    },
    10,
    3
);
```
