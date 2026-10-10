In `fc_pro_order_details_subsection_header_{subsection_id}`, `order_notes` replaces `{subsection_id}`.

```php
add_action( 'fc_pro_order_details_subsection_header_order_notes',
    /**
     * Add custom information in order notes subsection header.
     *
     * @param string $subsection_id The ID of the order details subsection being rendered.
     */
    function( $subsection_id ) {
        echo '<div class="order-notes-custom-info">';
        echo esc_html__( 'Custom information', 'text-domain' );
        echo '</div>';
    },
    10
);
```
