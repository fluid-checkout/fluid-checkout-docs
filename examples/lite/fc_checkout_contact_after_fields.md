```php
add_action( 'fc_checkout_contact_after_fields',
    /**
     * Add contact fields help text.
     */
    function() {
        echo '<p>We will use information to contact you about your order!</p>';
    },
    10
);
```
