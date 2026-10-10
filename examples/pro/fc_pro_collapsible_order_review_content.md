```php
add_action( 'fc_pro_collapsible_order_review_content',
    /**
     * Add a custom message order review content.
     */
    function() {
        echo '<p class="fc-review-hint">Custom message</p>';
    },
    10
);
```
