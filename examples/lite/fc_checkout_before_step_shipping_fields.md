```php
add_action( 'fc_checkout_before_step_shipping_fields',
    /**
     * Add custom message.
     */
    function() {
        echo '<div>Custom message before shipping fields</div>';
    },
    10
);
```
