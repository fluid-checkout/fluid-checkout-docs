```php
add_filter( 'fc_pro_address_book_save_from_order_extra_fields',
    /**
     * Add custom fields to be saved to the address book when created from a new order at checkout.
     *
     * @param array $extra_field_keys Array of extra field keys to include. Default: array().
     * @param int $order_id Order ID of the completed order.
     * @param array $data Raw checkout form data from $_POST, containing all submitted field values including custom fields.
     * @return array Filtered value.
     */
    function( $extra_field_keys, $order_id, $data ) {
        // Add custom fields to save to the address book entries
        $extra_field_keys[] = 'vat_number';
        $extra_field_keys[] = 'house_number';

        return $extra_field_keys;
    },
    10,
    3
);
```
