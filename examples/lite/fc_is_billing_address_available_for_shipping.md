```php
add_filter( 'fc_is_billing_address_available_for_shipping',
    /**
     * Disable using billing address for shipping.
     *
     * @param bool $is_available Is available.
     * @return bool Filtered value.
     */
    function( $is_available ) {
        return false;
    },
    10
);
```
