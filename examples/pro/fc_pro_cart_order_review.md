```php
add_action( 'fc_pro_cart_order_review',
    /**
     * Add custom information.
     */
    function() {
        echo '<div class="custom-info">Custom information</div>';
    },
    10
);
```
