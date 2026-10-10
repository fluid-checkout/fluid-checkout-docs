```php
add_action( 'fc_checkout_order_review_actions',
    /**
     * Add sidebar actions.
     */
    function() {
        echo '<div class="sidebar-actions">Please review your order before proceeding</div>';
    },
    10
);
```
