```php
add_action( 'fc_pro_cart_item_actions_buttons',
    /**
     * Add custom information.
     *
     * @param array $cart_item Cart item data.
     * @param string $cart_item_key Cart item key.
     * @param \WC_Product $product Product object.
     */
    function( $cart_item, $cart_item_key, $product ) {
        echo '<div class="custom-info">Custom information</div>';
    },
    10,
    3
);
```
