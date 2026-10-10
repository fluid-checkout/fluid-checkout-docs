```php
add_action( 'fc_pro_cart_before_order_review_table',
    /**
     * Add custom information.
     */
    function() {
        echo '<div class="custom-info">Custom information</div>';
    },
    10
);
```
