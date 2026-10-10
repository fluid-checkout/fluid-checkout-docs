```php
add_filter( 'fc_enable_order_summary_cart_item_unit_price',
    /**
     * Hide cart items unit prices in the order summary on the checkout page.
     *
     * @param bool $enabled Whether the feature is enabled. Default true.
     * @return bool Filtered value.
     */
    function( $enabled ) {
        return false;
    },
    10
);
```
