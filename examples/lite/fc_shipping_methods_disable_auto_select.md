```php
add_filter( 'fc_shipping_methods_disable_auto_select',
    /**
     * Prevent automatic shipping method selection.
     *
     * @param string $value Value to filter.
     * @param mixed $default Default.
     * @param array $rates Rates.
     * @param string $chosen_method Chosen method.
     * @return string Filtered value.
     */
    function( $value, $default, $rates, $chosen_method ) {
        return false;
    },
    10,
    4
);
```
