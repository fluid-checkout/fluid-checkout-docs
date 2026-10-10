```php
add_action( 'fc_pro_order_pay_order_review_section',
    /**
     * Add custom order review section.
     */
    function() {
        echo '<div class="custom-order-review-section">';
        echo '<h3>' . esc_html__( 'Custom Review Section', 'text-domain' ) . '</h3>';
        echo '<p>' . esc_html__( 'Additional review information', 'text-domain' ) . '</p>';
        echo '</div>';
    },
    20
);
```
