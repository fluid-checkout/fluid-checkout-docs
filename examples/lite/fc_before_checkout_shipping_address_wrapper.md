```php
add_action( 'fc_before_checkout_shipping_address_wrapper',
    /**
     * Add shipping fields intro.
     *
     * @param WC_Checkout $checkout Checkout object.
     */
    function( $checkout ) {
        echo '<p>Please make sure to double check your information!</p>';
    },
    10
);
```
