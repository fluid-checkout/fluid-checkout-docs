```php
add_filter( 'fc_parsed_posted_data_reset_field_keys',
    /**
     * Add custom checkbox fields to reset list.
     *
     * @param array $value Value to filter.
     * @param array $posted_data Parsed posted checkout data.
     * @return array Filtered value.
     */
    function( $value, $posted_data ) {
        $value[] = 'custom_field';
        return $value;
    },
    10,
    2
);
```
