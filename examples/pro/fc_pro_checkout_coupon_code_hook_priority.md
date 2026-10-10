```php
add_filter( 'fc_pro_checkout_coupon_code_hook_priority',
    /**
     * Change coupon code section to display after payment.
     *
     * @param mixed $priority Callback priority.
     * @return mixed Filtered value.
     */
    function( $priority ) {
        // Only modify substep positions
        if ( 'substep' === $priority['type'] && 'payment' === $priority['substep_id'] ) {
            // Change to display after payment instead of before
            $priority['priority'] = 85;
        }

        return $priority;
    },
    10
);
```
