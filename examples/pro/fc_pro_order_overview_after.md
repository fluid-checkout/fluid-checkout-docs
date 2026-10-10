```php
add_action( 'fc_pro_order_overview_after',
    /**
     * Add action links after order overview.
     *
     * @param WC_Order $order The WooCommerce order object.
     */
    function( $order ) {
        echo '<div class="order-overview-intro">';
        echo '<p style="text-align: center;">Custom information after overview</p>';
        echo '</div>';
    },
    10
);
```
