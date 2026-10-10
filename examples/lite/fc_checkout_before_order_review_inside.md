```php
add_action( 'fc_checkout_before_order_review_inside',
    /**
     * Add order review intro.
     */
    function() {
        echo '<p>Please review your order before proceeding</p>';
    },
    10
);
```
