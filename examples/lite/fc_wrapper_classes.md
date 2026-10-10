```php
add_filter( 'fc_wrapper_classes',
    /**
     * Add custom wrapper classes.
     *
     * @param string $classes CSS classes. Default empty string.
     * @return string Filtered value.
     */
    function( $classes ) {
        $classes .= ' custom-checkout-wrapper';
        return $classes;
    },
    10
);
```
