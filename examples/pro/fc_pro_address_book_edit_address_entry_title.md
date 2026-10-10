```php
add_filter( 'fc_pro_address_book_edit_address_entry_title',
    /**
     * Customize address editing title with more context.
     *
     * @param string $title Page title.
     * @param string $address_id Address ID.
     * @return string Filtered value.
     */
    function( $title, $address_id ) {
        if ( $address_id == 'new' ) {
            return 'Create New Address Entry';
        } else {
            return 'Modify Address Entry #' . $address_id;
        }
    },
    10,
    2
);
```
