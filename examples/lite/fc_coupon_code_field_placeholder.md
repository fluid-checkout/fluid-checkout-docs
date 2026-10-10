```php
add_filter( 'fc_coupon_code_field_placeholder',
    /**
     * Customize coupon code field placeholder.
     *
     * @param string $value Value to filter.
     * @return string Filtered value.
     */
    function( $value ) {
        return __( 'Type your discount code', 'my-theme' );
    },
    10
);
```
