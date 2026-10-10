```php
add_filter( 'fc_formatted_address_replacements_custom_field_keys',
    /**
     * Add custom fields to formatted address replacements.
     *
     * @param array $value Value to filter. Default empty array.
     * @return array Filtered value.
     */
    function( $value ) {
        $value[] = 'custom_field';

        return $value;
    },
    10
);
```
