```php
add_action( 'fc_pro_order_pay_after_order_review_inside',
    /**
     * Add help text inside order review.
     *
     * @param WC_Order $order The WooCommerce order object being reviewed.
     */
    function( $order ) {
        echo '<div class="order-review-help">';
        echo '<p>' . esc_html__( 'Questions about your order? Contact our support team.', 'text-domain' ) . '</p>';
        echo '</div>';
    },
    10
);
```
