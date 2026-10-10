```php
add_action( 'fc_checkout_after_order_review_title_before',
    /**
     * Add order review title prefix.
     */
    function() {
        echo '<div style="display: inline-block;">Prefix</div>';
    },
    10
);
```
