```php
add_filter( 'fc_pro_address_book_privacy_export_address_book_entry_field_value',
    /**
     * Format phone numbers for privacy export.
     *
     * @param mixed $field_value Field value.
     * @param string $field_key Field key.
     * @param array $address_book_entry Address book entry data.
     * @return mixed Filtered value.
     */
    function( $field_value, $field_key, $address_book_entry ) {
        if ( $field_key === 'phone' && ! empty( $field_value ) ) {
            return 'Phone: ' . $field_value;
        }
        return $field_value;
    },
    10,
    3
);
```
