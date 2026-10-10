```php
add_filter( 'fc_pro_cart_sidebar_attributes',
    /**
     * Add custom data attribute to cart sidebar.
     *
     * @param array $sidebar_attributes HTML attributes for the sidebar element.
     * @return array Filtered value.
     */
    function( $sidebar_attributes ) {
        $sidebar_attributes['custom-data'] = 'custom-attribute';
        return $sidebar_attributes;
    },
    10
);
```
