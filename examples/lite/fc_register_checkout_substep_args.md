```php
add_filter( 'fc_register_checkout_substep_args',
    /**
     * Customize checkout sub-step arguments.
     *
     * @param array $substep_args Substep args.
     * @param string $step_id Checkout step ID.
     * @return array Filtered value.
     */
    function( $substep_args, $step_id ) {
        if ( 'shipping_address' === $substep_args['substep_id'] ) {
            $substep_args['substep_title'] = __( 'Delivery Address', 'your-text-domain' );
        }
        return $substep_args;
    },
    10,
    2
);
```
