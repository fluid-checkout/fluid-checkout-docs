```php
add_filter( 'fc_no_validation_icon_field_types',
    /**
     * Add custom field type to hide validation icons.
     *
     * @param array $types List of values to filter.
     * @return array Filtered value.
     */
    function( $types ) {
        $types[] = 'custom_field_type';
        return $types;
    },
    10
);
```
