```php
add_filter( 'fc_pro_checkout_order_summary_collapsible_toggle_amount_text',
    /**
     * Prefix the order total with “Total:”.
     *
     * @param string $cart_total The cart total.
     * @return string Filtered value.
     */
    function( $cart_total ) {
        return 'Total: ' . $cart_total;
    },
    10
);
```
