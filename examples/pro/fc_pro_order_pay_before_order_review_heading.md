```php
add_action( 'fc_pro_order_pay_before_order_review_heading',
    /**
     * Add message before order review.
     *
     * @param \WC_Order $order Order object.
     */
    function( $order ) {
        echo '<div class="order-review-intro">';
        echo '<p>Please review your order details below</p>';
        echo '</div>';
    },
    10
);
```
