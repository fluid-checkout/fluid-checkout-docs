```php
add_action( 'fc_checkout_contact_before_fields',
    /**
     * Add custom message.
     */
    function() {
        echo '<div>Custom message</div>';
    },
    10
);
```
