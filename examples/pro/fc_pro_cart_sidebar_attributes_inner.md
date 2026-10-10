```php
add_filter( 'fc_pro_cart_sidebar_attributes_inner',
    /**
     * Add custom data attribute to cart sidebar inner.
     *
     * @param array $attributes Array of HTML attributes.
     * @return array Filtered value.
     */
    function( $attributes ) {
        $attributes['custom-data'] = 'custom-attribute';
        return $attributes;
    },
    10
);
```
