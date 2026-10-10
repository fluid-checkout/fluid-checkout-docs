```php
add_action( 'fc_pro_cart_after_order_review',
    /**
     * Add guarantee badge after cart order review.
     */
    function() {
        echo '<div class="cart-guarantee-badge">';
        echo '<p>' . esc_html__( '✓ 30-Day Money Back Guarantee', 'text-domain' ) . '</p>';
        echo '</div>';
    },
    10
);
```
