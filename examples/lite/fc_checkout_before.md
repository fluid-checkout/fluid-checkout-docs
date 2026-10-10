```php
add_action( 'fc_checkout_before',
    /**
     * Add div opening tag before checkout.
     *
     * @param WC_Checkout $checkout Checkout object.
     */
    function( $checkout ) {
        echo '<div class="custom-before-checkout">';
    },
    10
);
```
