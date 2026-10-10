```php
add_action( 'fc_pro_cart_after_main_section',
    /**
     * Add help section after cart main.
     */
    function() {
        echo '<div class="cart-help">';
        echo '<p>' . esc_html__( 'Need help? Contact our support team.', 'text-domain' ) . '</p>';
        echo '</div>';
    },
    10
);
```
