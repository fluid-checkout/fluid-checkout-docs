```php
add_action( 'fc_before_checkout_shipping_only_form',
    /**
     * Add shipping form intro.
     *
     * @param \WC_Checkout $checkout Checkout object.
     */
    function( $checkout ) {
        echo '<div style="margin-top: 2rem;">Complete your shipping information</div>';
    },
    10
);
```
