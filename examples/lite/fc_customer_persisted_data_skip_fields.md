```php
add_filter( 'fc_customer_persisted_data_skip_fields',
    /**
     * Skip persisting specific custom fields.
     *
     * @param mixed $skip_field_keys Skip field keys.
     * @param array $parsed_posted_data Parsed posted checkout data.
     * @return mixed Filtered value.
     */
    function( $skip_field_keys, $parsed_posted_data ) {
        $skip_field_keys[] = 'custom_temporary_field';
        return $skip_field_keys;
    },
    10,
    2
);
```
