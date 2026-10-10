```php
add_action( 'fc_pro_cart_item_actions_buttons',
    /**
     * Add custom information.
     *
     * @param array $cart_item The cart item data array.
     * @param string $cart_item_key The unique key for this cart item.
     * @param WC_Product $_product The product object.
     */
    function( $cart_item, $cart_item_key, $_product ) {
        echo '<div class="custom-info">Custom information</div>';
    },
    10,
    3
);
```
