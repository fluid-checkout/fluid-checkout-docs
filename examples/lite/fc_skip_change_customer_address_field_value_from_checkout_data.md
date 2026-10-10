```php
add_filter( 'fc_skip_change_customer_address_field_value_from_checkout_data',
    /**
     * Skip changing customer address field values.
     *
     * @param bool $skip Whether to skip the default behavior. Default false.
     * @param mixed $value Value to filter.
     * @param \WC_Customer $customer Customer.
     * @return bool Filtered value.
     */
    function( $skip, $value, $customer ) {
        return true; // Skip all changes
    },
    10,
    3
);
```
