```php
add_filter( 'fc_pro_address_book_entry_before_add',
    /**
     * Add "Company: " prefix to company field for better display.
     *
     * @param array $address_entry Address entry data.
     * @param int $user_id User ID.
     * @return array Filtered value.
     */
    function( $address_entry, $user_id ) {
        // Add "Company: " prefix if company field has a value
        if ( ! empty( $address_entry['company'] ) ) {
            $address_entry['company'] = 'Company: ' . $address_entry['company'];
        }

        return $address_entry;
    },
    10,
    2
);
```
