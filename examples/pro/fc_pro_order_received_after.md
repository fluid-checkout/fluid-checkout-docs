```php
add_action( 'fc_pro_order_received_after',
    /**
     * Add custom message after order received content.
     */
    function() {
        echo '<div class="custom-message">';
        echo '<p>' . esc_html__( 'Custom message.', 'text-domain' ) . '</p>';
        echo '</div>';
    },
    10
);
```
