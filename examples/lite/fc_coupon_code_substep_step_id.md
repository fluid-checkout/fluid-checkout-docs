```php
add_filter( 'fc_coupon_code_substep_step_id',
    /**
     * Display coupon codes in shipping step.
     *
     * @param string $value Value to filter. Default payment.
     * @return string Filtered value.
     */
    function( $value ) {
        return 'shipping';
    },
    10
);
```
