```php
add_filter( 'fc_pro_cart_item_remove_button_aria_label',
    /**
     * Customize remove button aria-label.
     *
     * @param string $name The name.
     * @param array $cart_item Cart item data.
     * @param string $cart_item_key Cart item key.
     * @param \WC_Product $product Product object.
     * @return string Filtered value.
     */
    function( $name, $cart_item, $cart_item_key, $product ) {
        return sprintf( __( 'Delete %s from cart', 'text-domain' ), $product->get_name() );
    },
    10,
    4
);
```
