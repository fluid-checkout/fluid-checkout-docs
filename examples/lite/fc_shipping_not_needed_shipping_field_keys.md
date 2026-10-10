```php
add_filter( 'fc_shipping_not_needed_shipping_field_keys',
    /**
     * Add custom shipping fields when shipping not needed.
     *
     * @param mixed $shipping_copy_billing_field_keys Shipping copy billing field keys.
     * @return mixed Filtered value.
     */
    function( $shipping_copy_billing_field_keys ) {
        $shipping_copy_billing_field_keys[] = 'shipping_custom_field';
        return $shipping_copy_billing_field_keys;
    },
    10
);
```
