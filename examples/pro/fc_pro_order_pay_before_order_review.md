```php
add_action( 'fc_pro_order_pay_before_order_review',
    /**
     * Add message before order review.
     */
    function() {
        echo '<div class="order-review-intro">';
        echo '<p>Please review your order details below</p>';
        echo '</div>';
    },
    10
);
```
