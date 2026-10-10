```php
add_filter( 'fc_select2_field_types',
    /**
     * Remove country field type from select2.
     *
     * @param array $types List of values to filter.
     * @return array Filtered value.
     */
    function( $types ) {
        // Remove 'country' from the array
        $types = array_diff( $types, array( 'country' ) );
        return $types;
    },
    10
);
```
