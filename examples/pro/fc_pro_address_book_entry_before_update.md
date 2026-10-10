```php
add_filter( 'fc_pro_address_book_entry_before_update',
    /**
     * Modify address entry before updating.
     *
     * @param array $address_entry Address entry data.
     * @param int $user_id User ID.
     * @return array Filtered value.
     */
    function( $address_entry, $user_id ) {
        // Add 'Updated: ' prefix to company field
        if ( ! empty( $address_entry['company'] ) ) {
            $address_entry['company'] = 'Updated: ' . $address_entry['company'];
        }

        return $address_entry;
    },
    10,
    2
);
```
