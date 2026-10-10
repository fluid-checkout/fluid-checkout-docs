```php
add_action( 'fc_checkout_before_order_review',
    /**
     * Add order review content.
     */
    function() {
        echo '<div class="order-review-info">Review your order details</div>';
    },
    10
);
```
