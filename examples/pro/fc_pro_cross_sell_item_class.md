```php
add_filter( 'fc_pro_cross_sell_item_class',
    /**
     * Add custom class to cross-sell items.
     *
     * @param string $class_name CSS class. Default empty.
     * @param \WC_Product $_product The product.
     * @return string Filtered value.
     */
    function( $class_name, $_product ) {
        $class_name .= ' custom-cross-sell';
        return $class_name;
    },
    10,
    2
);
```
