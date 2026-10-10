```php
add_action( 'fc_pro_cart_before_order_review',
    /**
     * Add message before cart order review.
     */
    function() {
        echo '<div class="cart-order-review-intro">';
        echo '<p>' . esc_html__( 'Review your order', 'text-domain' ) . '</p>';
        echo '</div>';
    },
    10
);
```
