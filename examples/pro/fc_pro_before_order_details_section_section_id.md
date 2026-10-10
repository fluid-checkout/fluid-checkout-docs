In `fc_pro_before_order_details_section_{section_id}`, `order_summary` replaces `{section_id}`.

```php
add_action( 'fc_pro_before_order_details_section_order_summary',
    /**
     * Add promotional message before order summary section.
     *
     * @param string $section_id The ID of the order details section being rendered.
     */
    function( $section_id ) {
        echo '<div class="promotional-message">';
        echo '<p>' . esc_html__( 'Thank you for your purchase! Enjoy 10% off your next order.', 'text-domain' ) . '</p>';
        echo '</div>';
    },
    10
);
```
