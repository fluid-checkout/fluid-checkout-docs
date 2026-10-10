```php
add_filter( 'fc_pro_address_book_entry_display_data',
    /**
     * Remove names for privacy.
     *
     * @param array $address_entry Address entry data.
     * @param string $address_id Address ID.
     * @return array Filtered value.
     */
    function( $address_entry, $address_id ) {
        // Remove names from display
        unset( $address_entry['last_name'] );

        return $address_entry;
    },
    10,
    2
);
```
