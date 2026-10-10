```php
add_filter( 'fc_pro_woodelivery_pro_pickup_location_address',
    /**
     * Add pickup location addresses for plugin Coderockz WooCommerce Delivery & Pickup Date Time Pro.
     *
     * @param array $value Filtered value. Default empty array.
     * @param mixed $pickup_location The pickup location.
     * @return array Filtered value.
     */
    function( $value, $pickup_location ) {
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

        return isset( $addresses[ $pickup_location ] ) ? $addresses[ $pickup_location ] : $value;
    },
    10,
    2
);
```
