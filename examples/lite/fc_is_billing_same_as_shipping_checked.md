```php
add_filter( 'fc_is_billing_same_as_shipping_checked',
    /**
     * Check billing same as shipping by default.
     *
     * @param mixed $billing_same_as_shipping Billing same as shipping.
     * @return mixed Filtered value.
     */
    function( $billing_same_as_shipping ) {
        return true;
    },
    10
);
```
