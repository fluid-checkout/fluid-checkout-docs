```php
add_filter( 'fc_shipping_method_substep_text_package_destination_data',
    /**
     * Add custom data to package destination.
     *
     * @param mixed $destination Destination.
     * @param mixed $recurring_cart_package_key Recurring cart package key.
     * @param array $package Shipping package data.
     * @param mixed $chosen_recurring_method Chosen recurring method.
     * @param WC_Shipping_Rate $method Method.
     * @return mixed Filtered value.
     */
    function( $destination, $recurring_cart_package_key, $package, $chosen_recurring_method, $method ) {
        $destination['custom_field'] = 'Custom value';
        return $destination;
    },
    10,
    5
);
```
