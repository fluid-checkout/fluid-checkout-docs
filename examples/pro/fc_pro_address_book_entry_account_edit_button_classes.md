```php
add_filter( 'fc_pro_address_book_entry_account_edit_button_classes',
    /**
     * Add custom CSS classes to edit button.
     *
     * @param string $classes CSS classes.
     * @param array $address_entry Address entry data.
     * @return string Filtered value.
     */
    function( $classes, $address_entry ) {
        $classes .= ' custom-class';
        return $classes;
    },
    10,
    2
);
```
