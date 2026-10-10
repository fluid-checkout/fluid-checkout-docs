```php
add_filter( 'fc_shipping_same_as_billing_field_keys',
    /**
     * Add custom field to billing to shipping copy.
     *
     * @param mixed $shipping_copy_shipping_field_keys Shipping copy shipping field keys.
     * @return mixed Filtered value.
     */
    function( $shipping_copy_shipping_field_keys ) {
        $shipping_copy_shipping_field_keys[] = 'custom_key';
        return $shipping_copy_shipping_field_keys;
    },
    10
);
```
