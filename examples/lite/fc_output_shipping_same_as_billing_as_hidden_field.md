```php
add_filter( 'fc_output_shipping_same_as_billing_as_hidden_field',
    /**
     * Force shipping same as billing as hidden field.
     *
     * @param bool $value Value to filter. Default false.
     * @return bool Filtered value.
     */
    function( $value ) {
        return true;
    },
    10
);
```
