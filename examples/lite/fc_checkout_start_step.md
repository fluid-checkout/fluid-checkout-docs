```php
add_action( 'fc_checkout_start_step',
    /**
     * Add dynamic wrapper div to checkout steps.
     *
     * @param string $step_id Checkout step ID.
     * @param array $step_args Checkout step arguments.
     * @param int $step_index Zero-based position of the step.
     * @param string $context Context in which the hook runs. Default checkout.
     */
    function( $step_id, $step_args, $step_index, $context ) {
        // Build dynamic classes
        $classes = array(
            'fc-step-wrapper',
            'fc-step-' . $step_id,
            'fc-step-index-' . $step_index
        );

        // Add context class if not default
        if ( $context !== 'checkout' ) {
            $classes[] = 'fc-step-context-' . $context;
        }

        printf( '<div class="%s" data-step="%s">', 
            esc_attr( implode( ' ', $classes ) ), 
            esc_attr( $step_id ) 
        );
    },
    10,
    4
);
```
