```php
add_filter( 'fc_shipping_method_option_markup',
    /**
     * Customize shipping method option markup.
     *
     * @param string $html HTML markup.
     * @param \WC_Shipping_Rate $method Method.
     * @param int $package_index Zero-based package index.
     * @param string $chosen_method Chosen method.
     * @param mixed $first First.
     * @return string Filtered value.
     */
    function( $html, $method, $package_index, $chosen_method, $first ) {
        $custom_class = 'custom-shipping-method';
        return str_replace( 'class="', 'class="' . $custom_class . ' ', $html );
    },
    10,
    5
);
```
