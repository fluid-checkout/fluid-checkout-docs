```php
add_filter( 'fc_pro_cross_sell_item_price',
    /**
     * Add "Price" prefix.
     *
     * @param string $product Product object.
     * @param \WC_Product $_product The product.
     * @return string Filtered value.
     */
    function( $product, $_product ) {
        return '<span class="from-price">Price: ' . $product . '</span>';
    },
    10,
    2
);
```
