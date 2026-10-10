```php
add_filter( 'fc_pro_cart_sidebar_attributes_inner',
    /**
     * Add custom data attribute to cart sidebar inner.
     *
     * @param array $sidebar_attributes_inner HTML attributes for the inner sidebar element.
     * @return array Filtered value.
     */
    function( $sidebar_attributes_inner ) {
        $sidebar_attributes_inner['custom-data'] = 'custom-attribute';
        return $sidebar_attributes_inner;
    },
    10
);
```
