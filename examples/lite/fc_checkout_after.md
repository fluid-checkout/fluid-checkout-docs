```php
add_action( 'fc_checkout_after',
    /**
     * Add div closing tag after checkout.
     *
     * @param WC_Checkout $checkout Checkout object.
     */
    function( $checkout ) {
        echo '</div>';
    },
    1
);
```
