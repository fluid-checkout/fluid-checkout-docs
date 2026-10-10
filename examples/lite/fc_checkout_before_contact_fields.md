```php
add_action( 'fc_checkout_before_contact_fields',
    /**
     * Add custom message.
     */
    function() {
        echo '<div>Custom message</div>';
    },
    10
);
```
