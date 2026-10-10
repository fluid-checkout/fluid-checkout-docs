```php
add_filter( 'fc_default_to_billing_same_as_shipping',
    /**
     * Force default to billing same as shipping regardless of settings.
     *
     * @param string $value Value to filter.
     * @return string Filtered value.
     */
    function( $value ) {
        return true;
    },
    10
);
```
