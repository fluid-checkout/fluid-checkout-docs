```php
add_filter( 'fc_pro_cart_item_remove_button_label',
    /**
     * Customize remove button label.
     *
     * @param string $label The remove button label. Defaults to “Remove item”.
     * @param array $cart_item The cart item data.
     * @param string $cart_item_key The cart item key.
     * @param WC_Product $product The product object.
     * @return string Filtered value.
     */
    function( $label, $cart_item, $cart_item_key, $product ) {
        return __( 'Delete', 'text-domain' );
    },
    10,
    4
);
```
