```php
add_action( 'fc_checkout_account_after_fields',
    /**
     * Add custom message.
     *
     * @param WC_Checkout $checkout Checkout object.
     */
    function( $checkout ) {
        echo '<div>Please review your information before proceeding</div>';
    },
    1
);
```
