```php
add_filter( 'fc_pro_address_book_entries_start_tag_markup',
    /**
     * Add custom class to address book entries list container.
     *
     * @param string $markup HTML markup.
     * @param string $address_type Address type (billing/shipping).
     * @param array $address_book_entries Address book entries.
     * @return string Filtered value.
     */
    function( $markup, $address_type, $address_book_entries ) {
        // Modify the existing markup instead of replacing it
        $markup = str_replace( 
            'class="address-book__entries"', 
            'class="address-book__entries custom-class"', 
            $markup 
        );
        return $markup;
    },
    10,
    3
);
```
