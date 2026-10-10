```php
add_action( 'fc_order_summary_cart_item_details',
    /**
     * Add product SKU to cart item details.
     *
     * @param array $cart_item Cart item data.
     * @param string $cart_item_key Cart item key.
     * @param WC_Product $_product Product object.
     */
    function( $cart_item, $cart_item_key, $_product ) {
        if ( $_product->get_sku() ) {
            echo '<div class="cart-item__element cart-item__sku">SKU: ' . esc_html( $_product->get_sku() ) . '</div>';
        }
    },
    10,
    3
);
```
