```php
add_action( 'fc_checkout_before_step_shipping_fields_inside',
    /**
     * Add shipping fields intro.
     */
    function() {
        echo '<p>Enter your shipping address</p>';
    },
    10
);
```
