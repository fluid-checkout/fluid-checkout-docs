```php
add_filter( 'fc_pro_needs_pickup_point_address_from_shipping_method',
    /**
     * Enable pickup address from shipping method for specific methods.
     *
     * @param bool $value Whether needs pickup point address from shipping method is needed. Default false.
     * @return bool Filtered value.
     */
    function( $value ) {
        // Enable for custom shipping method
        return true;
    },
    10
);
```
