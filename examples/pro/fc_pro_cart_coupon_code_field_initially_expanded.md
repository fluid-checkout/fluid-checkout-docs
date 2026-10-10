```php
add_filter( 'fc_pro_cart_coupon_code_field_initially_expanded',
    /**
     * Show coupon field expanded by default.
     *
     * @param bool $value Whether cart coupon code field initially expanded. Default false.
     * @return bool Filtered value.
     */
    function( $value ) {
        return true;
    },
    10
);
```
