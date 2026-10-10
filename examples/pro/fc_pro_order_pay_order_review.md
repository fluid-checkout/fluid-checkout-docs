```php
add_action( 'fc_pro_order_pay_order_review',
    /**
     * Add payment deadline notice to order review.
     *
     * @param \WC_Order $order Order object.
     */
    function( $order ) {
        $order_date = $order->get_date_created();
        $deadline = $order_date->modify( '+7 days' )->format( 'F j, Y' );

        echo '<div class="payment-deadline-notice">';
        echo '<p><strong>Payment due by:</strong> ' . esc_html( $deadline ) . '</p>';
        echo '</div>';
    },
    5
);
```
