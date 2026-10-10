```php
add_filter( 'fc_is_shipping_same_as_billing_checked',
    /**
     * Check shipping same as billing by default.
     *
     * @param mixed $shipping_same_as_billing Shipping same as billing.
     * @return mixed Filtered value.
     */
    function( $shipping_same_as_billing ) {
        return true;
    },
    10
);
```
