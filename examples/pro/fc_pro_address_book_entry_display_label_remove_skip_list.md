```php
add_filter( 'fc_pro_address_book_entry_display_label_remove_skip_list',
    /**
     * Skip showing company and phone values when displaying the list of available address book entries.
     *
     * @param array $skip_list Array of field keys to skip. Defaults to array( 'address_id', 'address_label', 'default_shipping', 'default_billing' )
     * @return array Filtered value.
     */
    function( $skip_list ) {
        // Add company and phone to skip list
        $skip_list[] = 'company';
        $skip_list[] = 'phone';

        return $skip_list;
    },
    10
);
```
