```php
add_action( 'fc_pro_cart_review_order_shipping_inside_row',
    /**
     * Add delivery date estimate inside shipping row.
     */
    function() {
        $estimated_date = date( 'M j', strtotime( '+5 days' ) );
        echo '<div class="estimated-delivery">';
        echo '<small>' . sprintf( esc_html__( 'Est. delivery: %s', 'text-domain' ), $estimated_date ) . '</small>';
        echo '</div>';
    },
    10
);
```
