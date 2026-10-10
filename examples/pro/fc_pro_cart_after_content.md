```php
add_action( 'fc_pro_cart_after_content',
    /**
     * Add trust badges after cart content.
     */
    function() {
        echo '<div class="cart-trust-badges">';
        echo '<p>' . esc_html__( '🔒 Secure Checkout | 📦 Free Returns', 'text-domain' ) . '</p>';
        echo '</div>';
    },
    10
);
```
