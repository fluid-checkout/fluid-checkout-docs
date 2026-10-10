```php
add_action( 'fc_pro_order_pay_sections',
    /**
     * Add custom order pay section.
     *
     * @param \WC_Order $order Order object.
     */
    function( $order ) {
        echo '<div class="custom-order-pay-section">';
        echo '<h3>Custom Section</h3>';
        echo '<p>Additional information for order payment</p>';
        echo '</div>';
    },
    5
);
```
