```php
add_action( 'fc_checkout_before_step_billing_fields',
    /**
     * Add Custom message to Billing only form.
     */
    function() {
        echo '<div>Custom message</div>';
    },
    10
);
```
