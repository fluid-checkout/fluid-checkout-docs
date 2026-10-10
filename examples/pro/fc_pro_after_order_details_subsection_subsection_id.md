In `fc_pro_after_order_details_subsection_{subsection_id}`, `order_notes` replaces `{subsection_id}`.

```php
add_action( 'fc_pro_after_order_details_subsection_order_notes',
    /**
     * Add help text after order notes subsection.
     *
     * @param string $subsection_id The ID of the order details subsection being rendered.
     */
    function( $subsection_id ) {
        echo '<div class="order-notes-help">';
        echo '<p><small>' . esc_html__( 'These notes will be visible to the store administrators only.', 'text-domain' ) . '</small></p>';
        echo '</div>';
    },
    10
);
```
