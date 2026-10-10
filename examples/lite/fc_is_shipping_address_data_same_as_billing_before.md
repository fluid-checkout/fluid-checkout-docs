```php
add_filter( 'fc_is_shipping_address_data_same_as_billing_before',
    /**
     * Force shipping and billing addresses to always be considered different.
     *
     * @param mixed $value Short-circuit value. Return a non-null value to override the default behavior. Default null.
     * @return mixed Filtered value.
     */
    function( $value ) {
        // Return false
        return false;
    },
    10
);
```
