```php
add_filter( 'fc_pro_cart_sidebar_attributes',
    /**
     * Add custom data attribute to cart sidebar.
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
