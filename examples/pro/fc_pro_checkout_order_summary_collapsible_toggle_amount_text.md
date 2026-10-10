```php
add_filter( 'fc_pro_checkout_order_summary_collapsible_toggle_amount_text',
    /**
     * Prefix the order total with “Total:”.
     *
     * @param string $amount_text – the amount HTML/text that Fluid Checkout has formatted.
     * @return string Filtered value.
     */
    function( $amount_text ) {
        return 'Total: ' . $amount_text;
    },
    10
);
```
