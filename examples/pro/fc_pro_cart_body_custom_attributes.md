```php
add_filter( 'fc_pro_cart_body_custom_attributes',
    /**
     * Add custom data attribute to cart body element.
     *
     * @param array $attributes Array of HTML attributes.
     * @return array Filtered value.
     */
    function( $attributes ) {
        $attributes['cart-custom-data'] = 'custom-data';
        return $attributes;
    },
    10
);
```
