```php
add_filter( 'fc_pro_address_book_save_from_order_skip_fields',
    /**
     * Skip saving company and phone fields address book when created from a new order at checkout.
     *
     * @param array $skip_field_keys Array of field keys to skip. Default: array( 'email' ).
     * @param int $order_id Order ID of the completed order.
     * @param array $data Order data object containing billing and shipping address information.
     * @return array Filtered value.
     */
    function( $skip_field_keys, $order_id, $data ) {
        // Add company and phone to skip list
        $skip_field_keys[] = 'company';
        $skip_field_keys[] = 'phone';

        return $skip_field_keys;
    },
    10,
    3
);
```
