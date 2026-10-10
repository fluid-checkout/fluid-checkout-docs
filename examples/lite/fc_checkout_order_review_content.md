```php
add_action( 'fc_checkout_order_review_content',
    /**
     * Add order review content.
     */
    function() {
        echo '<div class="order-review-info">Custom content</div>';
    },
    10
);
```
