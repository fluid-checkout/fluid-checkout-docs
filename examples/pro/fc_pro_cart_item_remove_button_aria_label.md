```php
add_filter( 'fc_pro_cart_item_remove_button_aria_label',
    /**
     * Customize remove button aria-label.
     *
     * @param string $aria_label The remove button aria-label.
     * @param array $cart_item The cart item data.
     * @param string $cart_item_key The cart item key.
     * @param WC_Product $product The product object.
     * @return string Filtered value.
     */
    function( $aria_label, $cart_item, $cart_item_key, $product ) {
        return sprintf( __( 'Delete %s from cart', 'text-domain' ), $product->get_name() );
    },
    10,
    4
);
```
