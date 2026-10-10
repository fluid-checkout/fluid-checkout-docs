```php
add_action( 'fc_pro_checkout_review_order_after_order_total',
    /**
     * Add savings total line to order summary.
     */
    function() {
        $discount_total = WC()->cart->get_cart_discount_total();
        if ( $discount_total > 0 ) {
            echo '<tr class="cart-savings">';
            echo '<th>' . esc_html__( 'Total Savings:', 'text-domain' ) . '</th>';
            echo '<td><strong>' . wc_price( $discount_total ) . '</strong></td>';
            echo '</tr>';
        }
    },
    10
);
```
