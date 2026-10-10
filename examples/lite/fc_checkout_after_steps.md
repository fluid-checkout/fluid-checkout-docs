```php
add_action( 'fc_checkout_after_steps',
    /**
     * Add steps summary with reminder to review information.
     *
     * @param WC_Checkout $checkout Checkout object.
     */
    function( $checkout ) {
        echo '<div class="steps-summary">You are almost there! Please double check all the information provided before placing your order.</div>';
    },
    1
);
```
