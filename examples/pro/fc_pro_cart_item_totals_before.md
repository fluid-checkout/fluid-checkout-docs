```php
add_action( 'fc_pro_cart_item_totals_before',
    /**
     * Add discount badge before item total.
     *
     * @param array $cart_item Cart item data.
     * @param string $cart_item_key Cart item key.
     * @param \WC_Product $_product The product.
     */
    function( $cart_item, $cart_item_key, $_product ) {
        // Check if item is on sale
        if ( $_product->is_on_sale() ) {
            echo '<div class="cart-item-sale-badge">';
            echo '<span class="badge">On Sale!</span>';
            echo '</div>';
        }
    },
    10,
    3
);
```
