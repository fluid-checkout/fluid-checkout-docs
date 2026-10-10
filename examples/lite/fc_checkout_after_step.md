```php
add_action( 'fc_checkout_after_step',
    /**
     * Add div closing tag with dynamic comments.
     *
     * @param string $step_id Checkout step ID.
     * @param array $step_args Checkout step arguments.
     * @param int $step_index Zero-based position of the step.
     * @param string $context Context in which the hook runs. Default checkout.
     */
    function( $step_id, $step_args, $step_index, $context ) {
        $comment = 'End of ' . esc_html( $step_id ) . ' step';

        // Add additional context if available
        if ( isset( $step_args['title'] ) ) {
            $comment .= ' - ' . esc_html( $step_args['title'] );
        }

        echo '<!-- ' . $comment . ' -->';
        echo '</div>';
    },
    10,
    4
);
```
