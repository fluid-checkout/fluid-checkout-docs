```php
add_filter( 'fc_coupon_code_button_label',
    /**
     * Customize coupon code apply button label.
     *
     * @param string $label Label text.
     * @return string Filtered value.
     */
    function( $label ) {
        return __( 'Apply Discount', 'my-theme' );
    },
    10
);
```
