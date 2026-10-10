```php
add_filter( 'fc_checkout_billing_collapsible_initial_state',
    /**
     * Start with billing address expanded.
     *
     * @param mixed $collapsible_initial_state Collapsible initial state.
     * @return mixed Filtered value.
     */
    function( $collapsible_initial_state ) {
        return 'expanded';
    },
    10
);
```
