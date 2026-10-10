```php
add_filter( 'fc_pro_address_book_is_address_entry_valid_for_checkout',
    /**
     * Require that German address have a company name provided for the address to be available at checkout.
     *
     * @param bool $address_entry_valid Current validation status.
     * @param array $address_entry Address entry data:
     * @param string $address_type Address type. Accepts shipping or billing.
     * @return bool Filtered value.
     */
    function( $address_entry_valid, $address_entry, $address_type ) {
        // Bail if not a German address, do not validate company field in this case
        if ( 'DE' !== $address_entry['country'] ) {
            return $address_entry_valid;
        }

        // Make address invalid for checkout, if missing company name
        if ( ! array_key_exists( 'company', $address_entry ) || empty( $address_entry['company'] ) ) {
            return false;
        }

        return $address_entry_valid;
    },
    10,
    3
);
```
