```php
add_action( 'fc_pro_order_pay_before_sections',
    /**
     * Add order summary banner before sections.
     *
     * @param WC_Order $order The WooCommerce order object being processed.
     */
    function( $order ) {
        echo '<div class="order-pay-intro">Complete your payment for order #' . esc_html( $order->get_order_number() ) . '</div>';
    },
    10
);
```
