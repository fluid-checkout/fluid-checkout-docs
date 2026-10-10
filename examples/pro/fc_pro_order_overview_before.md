```php
add_action( 'fc_pro_order_overview_before',
    /**
     * Add message before order overview.
     *
     * @param \WC_Order $order Order object.
     */
    function( $order ) {
        echo '<div class="order-overview-intro">';
        echo '<p style="text-align: center;">Here are your order details:</p>';
        echo '</div>';
    },
    10
);
```
