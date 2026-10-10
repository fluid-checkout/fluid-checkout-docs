When calling add_filter(), the priority must be higher than 10 to ensure your custom filter takes precedence over any default or lower-priority filters attached to the hook fc_billing_address_substep_position_args.

```php
add_filter( 'fc_billing_address_substep_position_args',
    /**
     * Customize billing address substep position.
     *
     * @param array $value Value to filter.
     * @return array Filtered value.
     */
    function( $value ) {
        // Position billing after additional notes (value 100) in shipping step
        $value['substep_after_shipping'] = array( 'step_id' => 'shipping', 'priority' => 150 );

        return $value;
    },
    20
);
```
