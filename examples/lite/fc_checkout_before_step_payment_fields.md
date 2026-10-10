```php
add_action( 'fc_checkout_before_step_payment_fields',
    /**
     * Add custom message.
     */
    function() {
        echo '<div>Custom Payment information</div>';
    },
    10
);
```
