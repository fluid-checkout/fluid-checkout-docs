```php
add_action( 'fc_checkout_before_payment',
    /**
     * Add payment intro.
     *
     * @param \WC_Checkout $checkout Checkout object.
     */
    function( $checkout ) {
        echo '<p>Select your payment method</p>';
    },
    10
);
```
