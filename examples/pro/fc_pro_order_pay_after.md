```php
add_action( 'fc_pro_order_pay_after',
    /**
     * Add tracking script after order pay.
     *
     * @param \WC_Order $order Order object.
     */
    function( $order ) {
        echo '<div class="order-pay-help">';
        echo '<p>Need assistance? <a href="' . esc_url( home_url( '/contact' ) ) . '">Contact us</a></p>';
        echo '</div>';
    },
    10
);
```
