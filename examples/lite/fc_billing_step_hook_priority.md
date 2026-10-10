```php
add_filter( 'fc_billing_step_hook_priority',
    /**
     * Change billing step hooks priority.
     *
     * @param mixed $step_priority Step priority.
     * @return mixed Filtered value.
     */
    function( $step_priority ) {
        // Force billing step before shipping
        return 15;
    },
    10
);
```
