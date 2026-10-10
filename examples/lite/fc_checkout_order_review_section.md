```php
add_action( 'fc_checkout_order_review_section',
    /**
     * Add order review content.
     */
    function() {
        echo '<div class="order-review-info">Review your order details</div>';
    },
    10
);
```
