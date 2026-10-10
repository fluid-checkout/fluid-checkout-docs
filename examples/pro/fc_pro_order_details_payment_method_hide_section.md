Example 1: Always show payment section for a specific payment gateway

```php
add_filter( 'fc_pro_order_details_payment_method_hide_section',
    /**
     * Show payment section for specific order statuses.
     *
     * @param bool $hide_section Whether to hide the payment method section. true means hide it, false means show it.
     * @param WC_Order $order The order object being displayed.
     * @return bool Filtered value.
     */
    function( $hide_section, $order ) {
        // Show payment section for failed orders
        if ( $order->has_status( 'failed' ) ) {
            return false; // false = show the section
        }

        return $hide_section;
    },
    10,
    2
);
```
