```php
add_filter( 'fc_is_billing_address_forced_same_as_shipping_address',
    /**
     * Force billing address to always be same as shipping.
     *
     * @param bool $is_billing_forced_same_as_shipping Is billing forced same as shipping.
     * @return bool Filtered value.
     */
    function( $is_billing_forced_same_as_shipping ) {
        return true;
    },
    10
);
```
