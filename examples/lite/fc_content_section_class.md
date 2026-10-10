```php
add_filter( 'fc_content_section_class',
    /**
     * Add custom classes to content section.
     *
     * @param string $classes CSS classes. Default empty string.
     * @return string Filtered value.
     */
    function( $classes ) {
        $classes .= ' custom-content-wrapper';
        return $classes;
    },
    10
);
```
