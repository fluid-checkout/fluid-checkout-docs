```php
add_filter( 'fc_pro_address_book_entry_account_delete_button_classes',
    /**
     * Add custom CSS classes to delete button.
     *
     * @param mixed $classes Parameter value.
     * @param mixed $address_entry Parameter value.
     * @return mixed Filtered value.
     */
    function( $classes, $address_entry ) {
        $classes .= ' custom-class';
        return $classes;
    },
    10,
    2
);
```
