```php
add_action( 'fc_pro_order_received_before_content',
    /**
     * Add order received intro message.
     */
    function() {
        echo '<div class="order-received-intro">';
        echo '<p>' . esc_html__( 'Your order has been received and is being processed.', 'text-domain' ) . '</p>';
        echo '</div>';
    },
    10
);
```
