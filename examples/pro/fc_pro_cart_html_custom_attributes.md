```php
add_filter( 'fc_pro_cart_html_custom_attributes',
    /**
     * Add custom data attribute to cart HTML element.
     *
     * @param array $attributes HTML attributes. Default empty array.
     * @return array Filtered value.
     */
    function( $attributes ) {
        $attributes['cart-custom-data'] = 'custom-data';
        return $attributes;
    },
    10
);
```
