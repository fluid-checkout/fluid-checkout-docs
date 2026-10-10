```php
add_action( 'fc_pro_cross_sell_item_details_inner_after',
    /**
     * Add badge before cross-sell item details.
     *
     * @param \WC_Product $_product The product.
     */
    function( $_product ) {
        if ( $_product->is_on_sale() ) {
            echo '<span class="cross-sell-badge">On Sale!</span>';
        }
    },
    10
);
```
