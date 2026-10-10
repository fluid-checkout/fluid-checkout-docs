```php
add_filter( 'fc_pro_address_book_saved_addresses_filter_min_count',
    /**
     * Show the saved-addresses filter once there are at least two entries.
     *
     * @param int $min_count Minimum number of saved address entries required to show the filter. Default: 10.
     * @param string $address_type Address type: billing or shipping.
     * @param array $address_book_entries The address book entries that will be listed (each entry is the usual address data structure used elsewhere in Address Book).
     * @return int Filtered value.
     */
    function( $min_count, $address_type, $address_book_entries ) {
        return 2;
    },
    10,
    3
);
```
