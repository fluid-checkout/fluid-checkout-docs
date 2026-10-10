```php
add_action( 'fc_checkout_before_step',
    /**
     * Add div opening tag with step-specific attributes.
     *
     * @param string $step_id Checkout step ID.
     * @param array $step_args Checkout step arguments.
     * @param int $step_index Zero-based position of the step.
     * @param string $context Context in which the hook runs. Default checkout.
     */
    function( $step_id, $step_args, $step_index, $context ) {
        echo '<div class="custom-before-step" data-step-id="' . esc_attr( $step_id ) . '" data-step-index="' . esc_attr( $step_index ) . '">';
    },
    10,
    4
);
```
