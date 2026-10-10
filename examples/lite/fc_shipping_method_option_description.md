```php
add_filter( 'fc_shipping_method_option_description',
    /**
     * Add custom descriptions to shipping methods.
     *
     * @param string $value Value to filter. Default empty string.
     * @param \WC_Shipping_Rate $method Method.
     * @return string Filtered value.
     */
    function( $value, $method ) {
        $method_id = $method->get_method_id();
        $custom_descriptions = array(
            'free_shipping' => __( 'Free shipping on orders over $50', 'my-theme' ),
            'flat_rate' => __( 'Standard delivery in 3-5 business days', 'my-theme' ),
            'local_pickup' => __( 'Pick up from our store location', 'my-theme' ),
        );

        if ( isset( $custom_descriptions[ $method_id ] ) ) {
            $value = $custom_descriptions[ $method_id ];
        }

        return $value;
    },
    10,
    2
);
```
