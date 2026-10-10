```php
add_filter( 'fc_is_shipping_address_available_for_billing',
    /**
     * Disable using shipping address for billing.
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
