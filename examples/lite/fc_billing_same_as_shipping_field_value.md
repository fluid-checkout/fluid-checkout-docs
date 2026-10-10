```php
add_filter( 'fc_billing_same_as_shipping_field_value',
    /**
     * Customize field values when copying shipping to billing.
     *
     * @param mixed $new_field_value New field value.
     * @param string $field_key Checkout field key.
     * @param mixed $shipping_field_key Shipping field key.
     * @param array $posted_data Parsed posted checkout data.
     * @return mixed Filtered value.
     */
    function( $new_field_value, $field_key, $shipping_field_key, $posted_data ) {
        if ( 'billing_first_name' === $field_key ) {
            return 'Customer ' . $new_field_value;
        }
        return $new_field_value;
    },
    10,
    4
);
```
