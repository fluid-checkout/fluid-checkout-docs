```php
add_filter( 'fc_pro_woodelivery_pro_pickup_location_address',
    /**
     * Add pickup location addresses for plugin Coderockz WooCommerce Delivery & Pickup Date Time Pro.
     *
     * @param array $address_data The address data for the selected pickup location.
     * @param array $pickup_location The selected pickup location.
     * @return array Filtered value.
     */
    function( $address_data, $pickup_location ) {
        // Define addresses for the corresponding pickup locations
        $addresses = array(
            'Pickup Location 1' => array( // Location name as defined in WooDelivery Pro settings
                'company'   => 'Main Store',
                'address_1' => '123 Main St',
                'city'      => 'Springfield',
                'postcode'  => '12345',
                'country'   => 'US',
            ),
            'Pickup Location 2' => array( // Location name as defined in WooDelivery Pro settings
                'company'   => 'Second Store',
                'address_1' => '123 Second St',
                'city'      => 'Snowfield',
                'postcode'  => '12345',
                'country'   => 'GE',
            ),
        );

        return isset( $addresses[ $pickup_location ] ) ? $addresses[ $pickup_location ] : $address_data;
    },
    10,
    2
);
```
