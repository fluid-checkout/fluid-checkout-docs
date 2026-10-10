```php
add_action( 'fc_checkout_after_order_review',
    /**
     * Add order review content.
     */
    function() {
        echo '<div class="order-review-info">Custom content</div>';
    },
    10
);
```
