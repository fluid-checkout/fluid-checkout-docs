```php
add_action( 'fc_pro_cart_cross_sell_item_actions',
    /**
     * Add badge before cross-sell item details.
     *
     * @param \WC_Product $_product The product.
     * @param array $args Template arguments.
     */
    function( $_product, $args ) {
        if ( $_product->is_on_sale() ) {
            echo '<span class="cross-sell-badge">On Sale!</span>';
        }
    },
    10,
    2
);
```
