```php
add_filter( 'fc_pro_address_book_edit_address_entry_title_element',
    /**
     * Change address entry title element to h1.
     *
     * @param string $element HTML element name. Defaults to h3.
     * @return string Filtered value.
     */
    function( $element ) {
        return 'h1';
    },
    10
);
```
