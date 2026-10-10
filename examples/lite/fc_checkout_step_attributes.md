```php
add_filter( 'fc_checkout_step_attributes',
    /**
     * Add custom attributes to checkout steps.
     *
     * @param array $step_attributes Step attributes.
     * @param string $step_id Checkout step ID.
     * @param int $step_index Zero-based position of the step.
     * @param string $context Context in which the hook runs. Default checkout.
     * @return array Filtered value.
     */
    function( $step_attributes, $step_id, $step_index, $context ) {
        $step_attributes['data-step-custom'] = 'value';
        if ( 'contact' === $step_id ) {
            $step_attributes['class'] .= ' custom-contact-step';
        }
        return $step_attributes;
    },
    10,
    4
);
```
