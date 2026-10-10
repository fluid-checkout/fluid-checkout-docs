```php
add_filter( 'fc_pro_thwcfe_custom_section_substep_position_args',
    /**
     * Customize custom section positions.
     *
     * @param array $position_args Array of position arguments mapping section positions to step IDs and priorities.
     * @return array Filtered value.
     */
    function( $position_args ) {
        // Move 'after_billing_form' sections to payment step
        $position_args['after_billing_form'] = array(
            'step_id' => 'payment',
            'priority' => 10
        );

        return $position_args;
    },
    10
);
```
