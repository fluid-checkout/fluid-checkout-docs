```php
add_action( 'fc_pro_order_pay_after_order_review_table',
    /**
     * Add custom information after order review table.
     *
     * @param \WC_Order $order Order object.
     */
    function( $order ) {
        echo '<div class="custom-info">Custom information</div>';
    },
    10
);
```
