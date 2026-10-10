```php
add_action( 'fc_pro_cart_before',
    /**
     * Add promotional banner before cart.
     */
    function() {
        echo '<div class="cart-promo-banner">';
        echo '<p>' . esc_html__( 'Free shipping on orders over $50!', 'text-domain' ) . '</p>';
        echo '</div>';
    },
    10
);
```
