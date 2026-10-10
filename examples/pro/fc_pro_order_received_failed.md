```php
add_action( 'fc_pro_order_received_failed',
    /**
     * Add support contact for failed orders.
     *
     * @param WC_Order $order The failed order object.
     */
    function( $order ) {
            echo '<div style="text-align: center;" class="failed-order-support">';
            echo '<p>' . esc_html__( 'Need help? Contact our support team at 
        [email protected]
        ', 'text-domain' ) . '</p>';
            echo '</div>';
    },
    20
);
```
