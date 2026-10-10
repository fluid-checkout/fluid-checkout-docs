```php
add_action( 'fc_pro_cart_item_details',
    /**
     * Add product SKU to cart item details.
     *
     * @param array $cart_item Cart item data.
     * @param string $cart_item_key Cart item key.
     * @param \WC_Product $_product The product.
     */
    function( $cart_item, $cart_item_key, $_product ) {
        if ( $_product->get_sku() ) {
            echo '<div class="cart-item-sku">';
            echo '<small>SKU: ' . esc_html( $_product->get_sku() ) . '</small>';
            echo '</div>';
        }
    },
    15,
    3
);
```
