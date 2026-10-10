```php
add_filter( 'fc_pro_cart_item_remove_button_label',
    /**
     * Customize remove button label.
     *
     * @param string $label Label text.
     * @param array $cart_item Cart item data.
     * @param string $cart_item_key Cart item key.
     * @param \WC_Product $product Product object.
     * @return string Filtered value.
     */
    function( $label, $cart_item, $cart_item_key, $product ) {
        return __( 'Delete', 'text-domain' );
    },
    10,
    4
);
```
