```php
add_filter( 'fc_pro_content_section_class_cart',
    /**
     * Add theme container class to cart content section.
     *
     * @param string $value Filtered value. Default empty.
     * @return string Filtered value.
     */
    function( $value ) {
        return $value . ' custom-container';
    },
    10
);
```
