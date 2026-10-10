```php
add_filter( 'fc_pro_address_book_entry_is_empty_field_keys_skip_list',
    /**
     * Skip company and phone fields when checking if address is empty.
     * This changes the default behavior: addresses with only company/phone data
     * will now be considered "empty" and won't be migrated to address book
     *
     * @param array $skip_field_keys Array of field keys to skip when determining if address is empty.
     * @return array Filtered value.
     */
    function( $skip_field_keys ) {
        // Add company and phone to skip list for empty check
        // This means addresses with ONLY company/phone data will be considered empty
        $skip_field_keys[] = 'company';
        $skip_field_keys[] = 'phone';

        return $skip_field_keys;
    },
    10
);
```
