```php
add_filter( 'fc_pro_cart_shipping_destination_html',
    /**
     * Customize shipping destination display.
     *
     * @param string $html The shipping destination HTML.
     * @return string Filtered value.
     */
    function( $html ) {
        $destination = WC()->countries->get_formatted_address( WC()->customer->get_shipping() );
        return '<div class="custom-shipping-dest"><strong>Shipping to:</strong> ' . $destination . '</div>';
    },
    10
);
```
