Example 1: Always show payment section for a specific payment gateway

```php
add_filter( 'fc_pro_order_details_payment_method_hide_section',
    /**
     * Show payment section for specific order statuses.
     *
     * @param mixed $hide_payment_method_section The hide payment method section.
     * @param \WC_Order $order Order object.
     * @return mixed Filtered value.
     */
    function( $hide_payment_method_section, $order ) {
        // Show payment section for failed orders
        if ( $order->has_status( 'failed' ) ) {
            return false; // false = show the section
        }

        return $hide_payment_method_section;
    },
    10,
    2
);
```
