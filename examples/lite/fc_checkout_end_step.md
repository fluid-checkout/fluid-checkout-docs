```php
add_action( 'fc_checkout_end_step',
    /**
     * Close dynamic wrapper div for checkout steps.
     *
     * @param string $step_id Checkout step ID.
     * @param array $step_args Checkout step arguments.
     * @param int $step_index Zero-based position of the step.
     * @param string $context Context in which the hook runs. Default checkout.
     */
    function( $step_id, $step_args, $step_index, $context ) {
        // Add closing comment for debugging
        printf( '</div><!-- End fc-step-%s -->', esc_attr( $step_id ) );
    },
    10,
    4
);
```
