```php
add_filter( 'fc_shipping_method_option_image_markup',
    /**
     * Customize shipping method image wrapper adding custom class.
     *
     * @param string $html HTML markup.
     * @param WC_Shipping_Rate $method Method.
     * @param string $method_image_html Method image html.
     * @return string Filtered value.
     */
    function( $html, $method, $method_image_html ) {
        return '<span class="custom-class shipping-method__option-image">%s</span>';
    },
    10,
    3
);
```
