```php
add_action( 'fc_pro_order_pay_after_order_review',
    /**
     * Add security badge after order review.
     *
     * @param \WC_Order $order Order object.
     */
    function( $order ) {
        echo '<div class="security-badge">';
        echo '<p>🔒 ' . esc_html__( 'Secure Payment', 'text-domain' ) . '</p>';
        echo '</div>';
    },
    10
);
```
