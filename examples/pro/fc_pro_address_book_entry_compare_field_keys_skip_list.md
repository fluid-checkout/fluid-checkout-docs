```php
add_filter( 'fc_pro_address_book_entry_compare_field_keys_skip_list',
    /**
     * Skip company and phone fields when checking if address entries are the same.
     * This changes the default behavior: ignores company and phone number fields
     * when comparing address book entries.
     *
     * @param array $skip_field_keys Array of field keys to skip during comparison.
     * @return array Filtered value.
     */
    function( $skip_field_keys ) {
        // Add company and phone to skip list
        $skip_field_keys[] = 'company';
        $skip_field_keys[] = 'phone';

        return $skip_field_keys;
    },
    10
);
```
