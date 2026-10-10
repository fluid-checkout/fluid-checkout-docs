```php
add_filter( 'fc_copy_billing_to_shipping_address_when_shipping_not_needed',
    /**
     * Disable automatic copying of billing to shipping when shipping not needed.
     *
     * @param bool $value Value to filter. Default true.
     * @return bool Filtered value.
     */
    function( $value ) {
        return false;
    },
    10
);
```
