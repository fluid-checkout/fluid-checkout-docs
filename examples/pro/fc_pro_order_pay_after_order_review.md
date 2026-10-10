```php
add_action( 'fc_pro_order_pay_after_order_review',
    /**
     * Add security badge after order review.
     */
    function() {
        echo '<div class="security-badge">';
        echo '<p>🔒 ' . esc_html__( 'Secure Payment', 'text-domain' ) . '</p>';
        echo '</div>';
    },
    10
);
```
