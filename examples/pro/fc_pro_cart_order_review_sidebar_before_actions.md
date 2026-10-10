```php
add_action( 'fc_pro_cart_order_review_sidebar_before_actions',
    /**
     * Add security badge before cart actions.
     */
    function() {
        echo '<div class="cart-security-badge">';
        echo '<p>🔒 ' . esc_html__( 'Secure Checkout', 'text-domain' ) . '</p>';
        echo '</div>';
    },
    10
);
```
