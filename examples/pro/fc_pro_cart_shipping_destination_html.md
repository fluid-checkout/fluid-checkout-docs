```php
add_filter( 'fc_pro_cart_shipping_destination_html',
    /**
     * Customize shipping destination display.
     *
     * @param string $html HTML markup.
     * @param string $formatted_destination Formatted shipping destination.
     * @return string Filtered value.
     */
    function( $html, $formatted_destination ) {
        $destination = WC()->countries->get_formatted_address( WC()->customer->get_shipping() );
        return '<div class="custom-shipping-dest"><strong>Shipping to:</strong> ' . $destination . '</div>';
    },
    10,
    2
);
```
