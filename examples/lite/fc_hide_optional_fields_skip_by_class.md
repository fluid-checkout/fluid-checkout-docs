```php
add_filter( 'fc_hide_optional_fields_skip_by_class',
    /**
     * Add custom class to skip list.
     *
     * @param array $skip Whether to skip the default behavior.
     * @return array Filtered value.
     */
    function( $skip ) {
        $skip[] = 'custom-class';
        return $skip;
    },
    10
);
```
