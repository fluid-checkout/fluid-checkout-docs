```php
add_action( 'fc_pro_cart_order_review',
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
