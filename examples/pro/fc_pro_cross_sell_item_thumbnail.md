```php
add_filter( 'fc_pro_cross_sell_item_thumbnail',
    /**
     * Customize cross-sell thumbnail size.
     *
     * @param string $thumbnail_html The thumbnail HTML.
     * @param WC_Product $product The cross-sell product object.
     * @return string Filtered value.
     */
    function( $thumbnail_html, $product ) {
        return $product->get_image( 'medium' );
    },
    10,
    2
);
```
