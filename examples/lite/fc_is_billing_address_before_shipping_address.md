```php
add_filter( 'fc_is_billing_address_before_shipping_address',
    /**
     * Display billing address before shipping address.
     *
     * @param bool $is_billing_before_shipping Is billing before shipping.
     * @return bool Filtered value.
     */
    function( $is_billing_before_shipping ) {
        return true;
    },
    10
);
```
