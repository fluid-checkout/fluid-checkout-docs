```php
add_action( 'fc_checkout_after_step_payment_fields',
    /**
     * Add payment step footer.
     */
    function() {
        echo '<p>Please review your payment information before proceeding</p>';
    },
    10
);
```
