```php
add_action( 'fc_pro_cart_before_content',
    /**
     * Add cart introduction message.
     */
    function() {
        echo '<div class="cart-intro">';
        echo '<h2>' . esc_html__( 'Shopping Cart', 'text-domain' ) . '</h2>';
        echo '</div>';
    },
    10
);
```
