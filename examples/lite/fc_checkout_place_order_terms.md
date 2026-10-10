```php
add_action( 'fc_checkout_place_order_terms',
    /**
     * Add terms and conditions.
     */
    function() {
        echo '<div class="terms-conditions">By placing an order, you agree to our terms:</div>';
    },
    10
);
```
