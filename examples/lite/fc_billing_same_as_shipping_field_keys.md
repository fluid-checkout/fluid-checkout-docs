```php
add_filter( 'fc_billing_same_as_shipping_field_keys',
    /**
     * Add custom field to shipping to billing copy.
     *
     * @param mixed $billing_copy_shipping_field_keys Billing copy shipping field keys.
     * @return mixed Filtered value.
     */
    function( $billing_copy_shipping_field_keys ) {
        $billing_copy_shipping_field_keys[] = 'billing_company';
        return $billing_copy_shipping_field_keys;
    },
    10
);
```
