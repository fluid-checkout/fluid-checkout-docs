```php
add_filter( 'fc_pro_thwcfe_custom_section_substep_position_args',
    /**
     * Customize custom section positions.
     *
     * @param array $substep_position_args The substep position args.
     * @return array Filtered value.
     */
    function( $substep_position_args ) {
        // Move 'after_billing_form' sections to payment step
        $substep_position_args['after_billing_form'] = array(
            'step_id' => 'payment',
            'priority' => 10
        );

        return $substep_position_args;
    },
    10
);
```
