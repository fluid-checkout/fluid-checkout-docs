```php
add_action( 'fc_checkout_after_order_review_title_after',
    /**
     * Add order review title suffix.
     */
    function() {
        echo '<div style="display: inline-block;">Suffix</div>';
    },
    10
);
```
