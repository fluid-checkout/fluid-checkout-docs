```php
add_action( 'fc_pro_address_book_before_checkout_entries_list',
    /**
     * Add instructions before address book entries.
     *
     * @param mixed $address_type Parameter value.
     * @param mixed $address_book_entries Parameter value.
     */
    function( $address_type, $address_book_entries ) {
        if ( ! empty( $address_book_entries ) ) {
            echo '<p class="address-instructions">Choose from your saved addresses:</p>';
        }
    },
    10,
    2
);
```
