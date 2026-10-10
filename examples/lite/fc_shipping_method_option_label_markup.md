```php
add_filter( 'fc_shipping_method_option_label_markup',
    /**
     * Add custom styling to shipping method labels.
     *
     * @param string $label Label text.
     * @param WC_Shipping_Rate $method Method.
     * @return string Filtered value.
     */
    function( $label, $method ) {
        $method_id = $method->get_method_id();
        $custom_class = 'custom-shipping-label-' . sanitize_html_class( $method_id );
        return str_replace( 'class="', 'class="' . $custom_class . ' ', $label );
    },
    10,
    2
);
```
