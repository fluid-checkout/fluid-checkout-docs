```php
add_filter( 'fc_pro_address_book_entry_account_cancel_button_classes',
    /**
     * Customize classes for Cancel button in account area.
     *
     * @param string $classes CSS classes.
     * @return string Filtered value.
     */
    function( $classes ) {
        $classes .= ' custom-class';
        return $classes;
    },
    10
);
```
