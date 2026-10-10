```php
add_action( 'fc_after_checkout_billing_only_form_inside',
    /**
     * Add billing form help.
     *
     * @param WC_Checkout $checkout Checkout object.
     */
    function( $checkout ) {
        echo '<p class="billing-help">Billing information is required</p>';
    },
    10
);
```
