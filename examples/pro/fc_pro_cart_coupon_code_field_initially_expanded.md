```php
add_filter( 'fc_pro_cart_coupon_code_field_initially_expanded',
    /**
     * Show coupon field expanded by default.
     *
     * @param bool $is_expanded Whether the field is initially expanded. Defaults to false.
     * @return bool Filtered value.
     */
    function( $is_expanded ) {
        return true;
    },
    10
);
```
