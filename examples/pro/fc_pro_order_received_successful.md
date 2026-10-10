```php
add_action( 'fc_pro_order_received_successful',
    /**
     * Add custom message.
     *
     * @param WC_Order $order The successful order object.
     */
    function( $order ) {
        echo '<div style="text-align: center;" class="custom-message">';
        echo '<p>' . esc_html__( 'Custom message.', 'text-domain' ) . '</p>';
        echo '</div>';
    },
    10
);
```
