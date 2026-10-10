```php
add_filter( 'fc_show_shipping_section_highlighted',
    /**
     * Always highlight shipping section.
     *
     * @param string $value Value to filter.
     * @return string Filtered value.
     */
    function( $value ) {
        return true;
    },
    10
);
```
