In `fc_pro_before_order_details_subsection_{subsection_id}`, `order_notes` replaces `{subsection_id}`.

```php
add_action( 'fc_pro_before_order_details_subsection_order_notes',
    /**
     * Add instructions before order notes subsection.
     *
     * @param string $subsection_id Subsection ID.
     */
    function( $subsection_id ) {
        echo '<div class="order-notes-instructions">';
        echo '<p>' . esc_html__( 'Add any special instructions or comments about your order below:', 'text-domain' ) . '</p>';
        echo '</div>';
    },
    10
);
```
