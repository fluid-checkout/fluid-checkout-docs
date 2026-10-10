In `fc_substep_title_{substep_id}`, `order_notes` replaces `{substep_id}`.

```php
add_filter( 'fc_substep_title_order_notes',
    /**
     * Rename the "Additional notes" substep heading.
     *
     * @param string $substep_title Checkout substep title.
     * @return string Filtered value.
     */
    function( $substep_title ) {
        return __( 'Delivery instructions', 'my-theme' );
    },
    10
);
```
