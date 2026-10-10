```php
add_filter( 'fc_pro_address_book_entry_account_markup',
    /**
     * Add custom class and label to account address entry markup.
     *
     * @param string $markup HTML markup.
     * @param array $address_entry Address entry data. Which usually will contain the fields below.
     * @param string $address_id Address book entry ID.
     * @return string Filtered value.
     */
    function( $markup, $address_entry, $address_id ) {
        // Add custom class to the existing li element
        $markup = str_replace( 'class="address-book-entry"', 'class="address-book-entry custom-class"', $markup );

        return $markup;
    },
    10,
    3
);
```
