```php
add_action( 'fc_pro_order_received_before',
    /**
     * Add celebration banner before order received.
     */
    function() {
        echo '<div class="order-received-celebration">';
        echo '<p style="text-align: center;">🎉 ' . esc_html__( 'Your order is being processed.', 'text-domain' ) . '</p>';
        echo '</div>';
    },
    10
);
```
