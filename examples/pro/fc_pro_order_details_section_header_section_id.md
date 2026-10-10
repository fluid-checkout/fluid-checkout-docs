In `fc_pro_order_details_section_header_{section_id}`, `customer_information` replaces `{section_id}`.

```php
add_action( 'fc_pro_order_details_section_header_customer_information',
    /**
     * Add custom message in customer information section header.
     *
     * @param string $section_id Section ID.
     */
    function( $section_id ) {
        echo '<div class="custom-info-message">';
        echo esc_html__( 'Your contact details for this order', 'text-domain' );
        echo '</div>';
    },
    10
);
```
