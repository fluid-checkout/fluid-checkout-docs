```php
add_filter( 'fc_shipping_method_substep_text_chosen_method_label',
    /**
     * Customize chosen shipping method label.
     *
     * @param string $chosen_method_label Chosen method label.
     * @param WC_Shipping_Rate $method Method.
     * @return string Filtered value.
     */
    function( $chosen_method_label, $method ) {
        return __( 'Selected shipping method', 'my-theme' );
    },
    10,
    2
);
```
