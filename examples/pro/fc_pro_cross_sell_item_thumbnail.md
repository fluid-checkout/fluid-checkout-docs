```php
add_filter( 'fc_pro_cross_sell_item_thumbnail',
    /**
     * Customize cross-sell thumbnail size.
     *
     * @param string $product Product object.
     * @param \WC_Product $_product The product.
     * @return string Filtered value.
     */
    function( $product, $_product ) {
        return $_product->get_image( 'medium' );
    },
    10,
    2
);
```
