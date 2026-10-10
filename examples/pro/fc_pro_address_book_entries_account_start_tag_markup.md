```php
add_filter( 'fc_pro_address_book_entries_account_start_tag_markup',
    /**
     * Add custom start markup to account address book container.
     *
     * @param string $markup HTML markup.
     * @param array $address_book_entries Address book entries.
     * @return string Filtered value.
     */
    function( $markup, $address_book_entries ) {
        // Add custom class to original markup
        $markup = '<ul id="address_book" class="address-book__entries custom-class">';
        return $markup;
    },
    10,
    2
);
```
