```php
add_filter( 'fc_shipping_method_substep_text_package_destination_text',
    /**
     * Customize package destination text.
     *
     * @param string $destination_text Destination text.
     * @param mixed $recurring_cart_package_key Recurring cart package key.
     * @param array $package Shipping package data.
     * @param mixed $chosen_recurring_method Chosen recurring method.
     * @param WC_Shipping_Rate $method Method.
     * @return string Filtered value.
     */
    function( $destination_text, $recurring_cart_package_key, $package, $chosen_recurring_method, $method ) {
        return 'Destination: ' . $destination_text;
    },
    10,
    5
);
```
