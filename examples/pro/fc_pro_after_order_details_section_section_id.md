In `fc_pro_after_order_details_section_{section_id}`, `customer_information` replaces `{section_id}`.

```php
add_action( 'fc_pro_after_order_details_section_customer_information',
    /**
     * Add help text after customer information section.
     *
     * @param string $section_id Section ID.
     */
    function( $section_id ) {
        echo '<div class="customer-info-help">';
        echo '<p><small>' . esc_html__( 'Need to update your information? Contact our support team.', 'text-domain' ) . '</small></p>';
        echo '</div>';
    },
    10
);
```
