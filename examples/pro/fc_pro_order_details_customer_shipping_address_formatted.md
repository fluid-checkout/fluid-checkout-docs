```php
add_filter( 'fc_pro_order_details_customer_shipping_address_formatted',
    /**
     * Wrap shipping address in a custom HTML wrapper.
     *
     * @param string $value Filtered value.
     * @param \WC_Order $order Order object.
     * @return string Filtered value.
     */
    function( $value, $order ) {
        return '<div class="custom-shipping-wrapper">' . $value . '</div>';
    },
    10,
    2
);
```
