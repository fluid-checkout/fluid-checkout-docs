```php
add_action( 'fc_pro_order_pay_after_sections',
    /**
     * Add help text after order pay sections.
     *
     * @param WC_Order $order The WooCommerce order object being processed.
     */
    function( $order ) {
        echo '<div class="order-pay-help">';
        echo '<p>Need assistance? <a href="' . esc_url( home_url( '/contact' ) ) . '">Contact us</a></p>';
        echo '</div>';
    },
    10
);
```
