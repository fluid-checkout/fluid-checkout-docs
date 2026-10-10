```php
add_action( 'fc_pro_order_received_successful_no_order_details',
    /**
     * Add help message when no order details are available.
     */
    function() {
        echo '<div style="text-align: center;" class="missing-order-details-help">';
        echo '<p>' . esc_html__( 'If you have any questions, please contact our support team with your order confirmation email.', 'text-domain' ) . '</p>';
        echo '</div>';
    },
    15
);
```
