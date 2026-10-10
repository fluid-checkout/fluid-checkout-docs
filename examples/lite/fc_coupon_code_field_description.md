```php
add_filter( 'fc_coupon_code_field_description',
    /**
     * Add description to coupon code field.
     *
     * @param string $value Value to filter. Default empty string.
     * @return string Filtered value.
     */
    function( $value ) {
        return __( 'Enter your discount code to apply savings.', 'my-theme' );
    },
    10
);
```
