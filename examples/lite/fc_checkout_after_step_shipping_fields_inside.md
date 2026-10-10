```php
add_action( 'fc_checkout_after_step_shipping_fields_inside',
    /**
     * Add shipping fields help.
     */
    function() {
        echo '<p class="shipping-help">Make sure your address is correct</p>';
    },
    10
);
```
