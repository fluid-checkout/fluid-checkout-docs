```php
add_action( 'fc_pro_cart_after_order_review_table',
    /**
     * Add custom information.
     *
     * @param mixed $order Parameter value.
     */
    function( $order ) {
        echo '<div class="custom-info">Custom information</div>';
    },
    10
);
```
