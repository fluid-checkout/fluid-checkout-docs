```php
add_filter( 'fc_pro_order_details_customer_information_show_shipping',
    /**
     * Always hide shipping address on order details page.
     *
     * @param bool $show_shipping Show shipping.
     * @param WC_Order $order Order object.
     * @return bool Filtered value.
     */
    function( $show_shipping, $order ) {
        return false;
    },
    10,
    2
);
```
