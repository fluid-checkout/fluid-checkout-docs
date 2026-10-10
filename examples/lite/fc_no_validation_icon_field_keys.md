```php
add_filter( 'fc_no_validation_icon_field_keys',
    /**
     * Hide validation icons for specific fields.
     *
     * @param array $value Value to filter. Default empty array.
     * @return array Filtered value.
     */
    function( $value ) {
        $value[] = 'shipping_first_name';
        $value[] = 'shipping_last_name';
        return $value;
    },
    10
);
```
