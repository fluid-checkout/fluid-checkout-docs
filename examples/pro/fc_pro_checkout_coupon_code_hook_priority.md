```php
add_filter( 'fc_pro_checkout_coupon_code_hook_priority',
    /**
     * Change coupon code section to display after payment.
     *
     * @param array $position_args Array defining position and hook:
     * @return array Filtered value.
     */
    function( $position_args ) {
        // Only modify substep positions
        if ( 'substep' === $position_args['type'] && 'payment' === $position_args['substep_id'] ) {
            // Change to display after payment instead of before
            $position_args['priority'] = 85;
        }

        return $position_args;
    },
    10
);
```
