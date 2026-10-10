```php
add_action( 'fc_pro_cart_item_totals_after',
    /**
     * Add savings amount after item total.
     *
     * @param array $cart_item Cart item data.
     * @param string $cart_item_key Cart item key.
     * @param \WC_Product $_product The product.
     */
    function( $cart_item, $cart_item_key, $_product ) {
        if ( $_product->is_on_sale() ) {
            $regular_price = $_product->get_regular_price();
            $sale_price = $_product->get_sale_price();
            $savings = ( $regular_price - $sale_price ) * $cart_item['quantity'];

            echo '<div class="cart-item-savings">';
            echo '<small>You save: ' . wc_price( $savings ) . '</small>';
            echo '</div>';
        }
    },
    10,
    3
);
```
