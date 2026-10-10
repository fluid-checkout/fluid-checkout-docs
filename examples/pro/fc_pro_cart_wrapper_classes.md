```php
add_filter( 'fc_pro_cart_wrapper_classes',
    /**
     * Add custom class to cart wrapper.
     *
     * @param string $classes Space-separated list of CSS classes.
     * @return string Filtered value.
     */
    function( $classes ) {
        return $classes . ' custom-cart-wrapper';
    },
    10
);
```
