```php
add_action( 'fc_checkout_account_before_fields',
    /**
     * Add custom message.
     *
     * @param WC_Checkout $checkout Checkout object.
     */
    function( $checkout ) {
        echo '<div>Account Information</div>';
    },
    1
);
```
