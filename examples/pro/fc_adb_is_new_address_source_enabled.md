```php
add_filter( 'fc_adb_is_new_address_source_enabled',
    /**
     * Remove the "Enter a new address" option from the address sources on checkout.
     * Customers will only be able to select from their saved addresses.
     *
     * @param bool $is_enabled Whether the new address source option is enabled. Default: true.
     * @return bool Filtered value.
     */
    function( $is_enabled ) {
        return false;
    },
    10
);
```
