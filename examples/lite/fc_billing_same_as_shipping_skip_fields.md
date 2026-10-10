```php
add_filter( 'fc_billing_same_as_shipping_skip_fields',
    /**
     * Skip phone field when copying shipping to billing.
     *
     * @param array $skip Whether to skip the default behavior. Default empty array.
     * @return array Filtered value.
     */
    function( $skip ) {
        $skip[] = 'billing_phone';
        return $skip;
    },
    10
);
```
