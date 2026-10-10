In `fc_after_substep_{substep_id}`, `shipping_methods` replaces `{substep_id}`.

```php
add_action( 'fc_after_substep_shipping_methods',
    /**
     * Add extra content after the sub-step contents.
     *
     * @param string $step_id Checkout step ID.
     * @param string $substep_id Checkout substep ID.
     * @param mixed $output_edit_buttons Whether edit and save buttons are output for the substep.
     * @param string $context Context in which the hook runs. Default checkout.
     */
    function( $step_id, $substep_id, $output_edit_buttons, $context ) {
        echo '<div>Custom content after sub-step.</div>';
    },
    10,
    4
);
```
