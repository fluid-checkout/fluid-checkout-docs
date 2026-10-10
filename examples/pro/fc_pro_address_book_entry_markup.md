```php
add_filter( 'fc_pro_address_book_entry_markup',
    /**
     * Add simple custom class to address book entries.
     *
     * @param string $markup The HTML markup.
     * @param array $address_entry Address entry data.
     * @param string $address_type Address type ( billing / shipping ).
     * @param string $address_label Formatted address label.
     * @param bool $is_selected_address Whether this address is selected.
     * @param bool $first Whether this is the first entry.
     * @return string Filtered value.
     */
    function( $markup, $address_entry, $address_type, $address_label, $is_selected_address, $first ) {
        // Simply add a custom class
        $markup = str_replace( 
            'class="address-book-entry update_totals_on_change"', 
            'class="address-book-entry update_totals_on_change my-custom-class"', 
            $markup 
        );

        return $markup;
    },
    10,
    6
);
```
