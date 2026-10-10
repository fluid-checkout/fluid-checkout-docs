```php
add_filter( 'fc_pro_order_details_item_thumbnail',
    /**
     * Use larger thumbnail size for order items.
     *
     * @param string $thumbnail_html The thumbnail HTML. Default is the product image or placeholder.
     * @param WC_Order_Item $item The order item object.
     * @param WC_Order $order The order object.
     * @return string Filtered value.
     */
    function( $thumbnail_html, $item, $order ) {
        $product = $item->get_product();

        if ( $product ) {
            return $product->get_image( 'medium' );
        }

        return $thumbnail_html;
    },
    10,
    3
);
```
