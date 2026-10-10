```php
add_filter( 'fc_show_billing_section_highlighted',
    /**
     * Always highlight billing section.
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
