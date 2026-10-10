```php
add_filter( 'fc_is_current_step',
    /**
     * Maybe set the contact step as the current step on the order pay page.
     *
     * @param bool $is_current_step Is current step.
     * @param string $step_id Checkout step ID.
     * @param string $context Context in which the hook runs. Default checkout.
     * @return bool Filtered value.
     */
    function( $is_current_step, $step_id, $context ) {
        // Bail if not on order pay context
        if ( 'order-pay' !== $context ) { return $is_current_step; }

        // Bail if not the checking the contact step
        if ( 'contact' !== $step_id ) { return $is_current_step; }

        // Otherwise, return as current.
        return true;
    },
    10,
    3
);
```
