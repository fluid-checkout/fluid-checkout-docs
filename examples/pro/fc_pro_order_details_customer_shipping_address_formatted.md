```php
add_filter( 'fc_pro_order_details_customer_shipping_address_formatted',
    /**
     * Wrap shipping address in a custom HTML wrapper.
     *
     * @param string $formatted_address The formatted shipping address HTML.
     * @param WC_Order $order The order object.
     * @return string Filtered value.
     */
    function( $formatted_address, $order ) {
        return '<div class="custom-shipping-wrapper">' . $formatted_address . '</div>';
    },
    10,
    2
);
```
