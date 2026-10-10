```php
add_filter( 'fc_pro_checkout_order_summary_collapsible_initial_state',
    /**
     * Force the collapsible order summary to start expanded.
     *
     * @param string $initial_state The current initial state for the collapsible order summary section. Accepts collapsed or expanded. Defaults to collapsed in most cases.
     * @return string Filtered value.
     */
    function( $initial_state ) {
        return 'expanded';
    },
    100
);
```
