```php
add_action( 'fc_pro_cart_after_order_review_inside',
    /**
     * Add payment methods preview inside cart order review.
     */
    function() {
        echo '<div class="cart-payment-methods-preview">';
        echo '<p><small>' . esc_html__( 'We accept: Visa, MasterCard, PayPal', 'text-domain' ) . '</small></p>';
        echo '</div>';
    },
    10
);
```
