```php
add_action( 'fc_pro_address_book_after_checkout_entries_list',
    /**
     * Add help text after address book entries.
     *
     * @param mixed $address_type Parameter value.
     * @param mixed $address_book_entries Parameter value.
     */
    function( $address_type, $address_book_entries ) {
        echo '<p class="address-help">If your address is not listed, please add it.</p>';
    },
    10,
    2
);
```
