```php
add_action( 'fc_checkout_after_step_billing_fields',
    /**
     * Add billing step footer.
     */
    function() {
        echo '<p>Please review your billing information before proceeding</p>';
    },
    10
);
```
