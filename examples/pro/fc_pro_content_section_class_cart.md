```php
add_filter( 'fc_pro_content_section_class_cart',
    /**
     * Add theme container class to cart content section.
     *
     * @param string $classes Space-separated list of CSS classes.
     * @return string Filtered value.
     */
    function( $classes ) {
        return $classes . ' custom-container';
    },
    10
);
```
