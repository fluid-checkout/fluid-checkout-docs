In `fc_after_substep_fields_{substep_id}`, `shipping_methods` replaces `{substep_id}`.

```php
add_action( 'fc_after_substep_fields_shipping_methods',
    /**
     * Add extra content after the sub-step contents.
     *
     * @param string $step_id Checkout step ID.
     * @param string $substep_id Checkout substep ID.
     * @param bool $collapsible Whether the substep fields section is collapsible.
     * @param string $context Context in which the hook runs. Default checkout.
     */
    function( $step_id, $substep_id, $collapsible, $context ) {
        echo '<div>Custom content after sub-step fields.</div>';
    },
    10,
    4
);
```
