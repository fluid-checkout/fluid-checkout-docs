```php
add_action( 'fc_pro_cart_before_order_review_heading',
    /**
     * Add message before cart order review heading.
     */
    function() {
        echo '<div class="cart-order-review-intro">';
        echo '<p>' . esc_html__( 'Custom information', 'text-domain' ) . '</p>';
        echo '</div>';
    },
    10
);
```
