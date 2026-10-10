```php
add_filter( 'fc_hide_optional_fields_skip_types',
    /**
     * Add textarea fields to skip list.
     *
     * @param array $skip Whether to skip the default behavior.
     * @return array Filtered value.
     */
    function( $skip ) {
        $skip[] = 'textarea';
        return $skip;
    },
    10
);
```
