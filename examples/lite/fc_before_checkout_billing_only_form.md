```php
add_action( 'fc_before_checkout_billing_only_form',
    /**
     * Add Custom message to Billing only form.
     *
     * @param WC_Checkout $checkout Checkout object.
     */
    function( $checkout ) {
        echo '<div>Custom message</div>';
    },
    10
);
```
