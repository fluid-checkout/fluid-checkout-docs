```php
add_action( 'fc_pro_order_received_notice_after',
    /**
     * Add promotional message before order received notice.
     *
     * @param \WC_Order $order Order object.
     */
    function( $order ) {
        echo '<div class="order-received-promo">';
        echo '<p>' . esc_html__( '🎁 Share your purchase on social media for a 10% discount on your next order!', 'text-domain' ) . '</p>';
        echo '</div>';
    },
    10
);
```
