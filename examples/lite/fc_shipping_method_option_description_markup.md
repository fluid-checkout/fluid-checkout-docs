```php
add_filter( 'fc_shipping_method_option_description_markup',
    /**
     * Add custom styling to shipping method descriptions.
     *
     * @param string $html HTML markup.
     * @param \WC_Shipping_Rate $method Method.
     * @return string Filtered value.
     */
    function( $html, $method ) {
        return '<div class="shipping-method-description-wrapper">' . $html . '</div>';
    },
    10,
    2
);
```
