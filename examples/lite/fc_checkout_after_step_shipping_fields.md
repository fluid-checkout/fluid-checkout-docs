```php
add_action( 'fc_checkout_after_step_shipping_fields',
    /**
     * Add custom message.
     */
    function() {
        echo '<div>Custom message after Shipping field</div>';
    },
    10
);
```
