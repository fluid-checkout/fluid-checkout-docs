```php
add_filter( 'fc_pro_cross_sell_item_name',
    /**
     * Add product category to cross-sell name.
     *
     * @param string $name_html The product name HTML.
     * @param WC_Product $product The cross-sell product object.
     * @return string Filtered value.
     */
    function( $name_html, $product ) {
        $categories = wc_get_product_category_list( $product->get_id() );
        return '<div class="product-category">' . $categories . '</div>' . $name_html;
    },
    10,
    2
);
```
