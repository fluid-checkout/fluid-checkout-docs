```php
add_filter( 'fc_pro_cross_sell_item_name',
    /**
     * Add product category to cross-sell name.
     *
     * @param string $product Product object.
     * @param \WC_Product $_product The product.
     * @return string Filtered value.
     */
    function( $product, $_product ) {
        $categories = wc_get_product_category_list( $_product->get_id() );
        return '<div class="product-category">' . $categories . '</div>' . $product;
    },
    10,
    2
);
```
