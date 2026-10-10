```php
add_action( 'fc_checkout_after_payment',
    /**
     * Add payment step footer.
     *
     * @param WC_Checkout $checkout Checkout object.
     */
    function( $checkout ) {
        echo '<p>Please review your payment information before proceeding</p>';
    },
    10
);
```
