```php
add_filter( 'fc_coupon_code_field_initially_expanded',
    /**
     * Start with coupon code field expanded.
     *
     * @param bool $value Value to filter. Default false.
     * @return bool Filtered value.
     */
    function( $value ) {
        return true;
    },
    10
);
```
