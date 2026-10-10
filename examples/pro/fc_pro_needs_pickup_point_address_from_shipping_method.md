```php
add_filter( 'fc_pro_needs_pickup_point_address_from_shipping_method',
    /**
     * Enable pickup address from shipping method for specific methods.
     *
     * @param bool $needs_address Whether to retrieve address from shipping method. Defaults to false.
     * @return bool Filtered value.
     */
    function( $needs_address ) {
        // Enable for custom shipping method
        return true;
    },
    10
);
```
