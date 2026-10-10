```php
add_action( 'fc_checkout_before_steps',
    /**
     * Add simple message above steps.
     *
     * @param WC_Checkout $checkout Checkout object.
     */
    function( $checkout ) {
        echo '<p class="notice">Free shipping on orders over $50!</p>';
    },
    1
);
```
