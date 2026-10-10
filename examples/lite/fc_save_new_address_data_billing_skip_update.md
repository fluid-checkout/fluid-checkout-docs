```php
add_filter( 'fc_save_new_address_data_billing_skip_update',
    /**
     * Skip updating billing address data.
     *
     * @param bool $skip Whether to skip the default behavior. Default false.
     * @param array $posted_data Parsed posted checkout data.
     * @return bool Filtered value.
     */
    function( $skip, $posted_data ) {
        return true; // Skip the update
    },
    10,
    2
);
```
