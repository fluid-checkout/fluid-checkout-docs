```php
add_filter( 'fc_pro_cross_sell_item_price',
    /**
     * Add "Price" prefix.
     *
     * @param string $price_html The price HTML.
     * @param WC_Product $product The cross-sell product object.
     * @return string Filtered value.
     */
    function( $price_html, $product ) {
        return '<span class="from-price">Price: ' . $price_html . '</span>';
    },
    10,
    2
);
```
