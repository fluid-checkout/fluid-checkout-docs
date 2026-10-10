```php
add_filter( 'fc_proceed_to_next_step_button_label',
    /**
     * Customize proceed button labels.
     *
     * @param string $button_label Button label.
     * @param string $step_id Checkout step ID.
     * @param array $step_args Checkout step arguments.
     * @return string Filtered value.
     */
    function( $button_label, $step_id, $step_args ) {
        if ( 'shipping' === $step_id ) {
            return __( 'Continue to Delivery', 'your-text-domain' );
        }
        return $button_label;
    },
    10,
    3
);
```
