```php
add_filter( 'fc_coupon_code_field_label',
    /**
     * Customize coupon code field label.
     *
     * @param string $label Label text.
     * @return string Filtered value.
     */
    function( $label ) {
        return __( 'Discount Code', 'my-theme' );
    },
    10
);
```
