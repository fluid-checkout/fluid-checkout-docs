```php
add_filter( 'fc_output_billing_same_as_shipping_as_hidden_field',
    /**
     * Force billing same as shipping as hidden field.
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
