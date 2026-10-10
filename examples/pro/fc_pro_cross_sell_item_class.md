```php
add_filter( 'fc_pro_cross_sell_item_class',
    /**
     * Add custom class to cross-sell items.
     *
     * @param string $classes Space-separated CSS classes.
     * @param WC_Product $product The cross-sell product object.
     * @return string Filtered value.
     */
    function( $classes, $product ) {
        $classes .= ' custom-cross-sell';
        return $classes;
    },
    10,
    2
);
```
