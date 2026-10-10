```php
add_action( 'fc_checkout_payment',
    /**
     * Add payment section content.
     */
    function() {
        echo '<div class="payment-info">Choose your payment method</div>';
    },
    10
);
```
