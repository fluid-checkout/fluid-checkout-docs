```php
add_filter( 'fc_pro_order_details_item_thumbnail',
    /**
     * Use larger thumbnail size for order items.
     *
     * @param string $product_image The product image.
     * @param \WC_Order_Item $item Order item.
     * @param \WC_Order $order Order object.
     * @return string Filtered value.
     */
    function( $product_image, $item, $order ) {
        $product = $item->get_product();

        if ( $product ) {
            return $product->get_image( 'medium' );
        }

        return $product_image;
    },
    10,
    3
);
```
