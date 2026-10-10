```php
add_action( 'fc_pro_order_pay_before_order_review_table',
    /**
     * Add custom information.
     *
     * @param WC_Order $order The WooCommerce order object being reviewed.
     */
    function( $order ) {
        echo '<div class="custom-info">Custom information</div>';
    },
    10
);
```
