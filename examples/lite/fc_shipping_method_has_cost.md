```php
add_filter( 'fc_shipping_method_has_cost',
    /**
     * Always show cost for all shipping methods.
     *
     * @param mixed $value Value to filter.
     * @param \WC_Shipping_Rate $method Method.
     * @return mixed Filtered value.
     */
    function( $value, $method ) {
        return true;
    },
    10,
    2
);
```
