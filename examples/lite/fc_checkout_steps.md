```php
add_action( 'fc_checkout_steps',
    /**
     * Custom steps output.
     *
     * @param WC_Checkout $checkout Checkout object.
     */
    function( $checkout ) {
        echo '<div class="custom-steps">Custom steps content</div>';
    },
    1
);
```
