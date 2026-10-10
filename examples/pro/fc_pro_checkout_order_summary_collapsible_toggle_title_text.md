```php
add_filter( 'fc_pro_checkout_order_summary_collapsible_toggle_title_text',
    /**
     * Always show a custom toggle title.
     *
     * @param string $text – the title text that Fluid Checkout computed.
     * @param int $cart_items_count – the number of items in the cart.
     * @return string Filtered value.
     */
    function( $text, $cart_items_count ) {
        return sprintf( _n( 'Review your %d item', 'Review your %d items', $cart_items_count, 'your-text-domain' ), $cart_items_count );
    },
    10,
    2
);
```
