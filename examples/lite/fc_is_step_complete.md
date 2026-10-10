```php
add_filter( 'fc_is_step_complete',
    /**
     * Set all steps as not-complete to force the user to always start from the first step.
     *
     * @param bool $is_step_complete Whether the step is complete.
     * @param string $step_id Checkout step ID.
     * @param string $context Context in which the hook runs. Default checkout.
     * @return bool Filtered value.
     */
    function( $is_step_complete, $step_id, $context ) {
        return false;
    },
    10,
    3
);
```
