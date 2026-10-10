```php
add_action( 'fc_pro_order_pay_order_review_table',
    /**
     * Add a reminder below the order review table on the order-pay page.
     *
     * @param \WC_Order $order Order object.
     */
    function( $order ) {
        echo '<p class="fc-order-pay-note">Custom note</p>';
    },
    10
);
```
