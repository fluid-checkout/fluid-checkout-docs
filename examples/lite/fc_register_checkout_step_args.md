```php
add_filter( 'fc_register_checkout_step_args',
    /**
     * Customize checkout step arguments.
     *
     * @param array $step_args Checkout step arguments.
     * @return array Filtered value.
     */
    function( $step_args ) {
            // Bail if not registering the Billing step
            if ( 'billing' !== $step_args['step_id'] ) { return $step_args; }

            // Change the billing step args
            $step_args['
        proceed_to_step_button_label
        '] = __( 'Proceed to invoicing', 'your-text-domain' );
            $step_args['next_step_button_classes'][] = 'custom-billing-button-class';

            return $step_args;
    },
    10
);
```
