```php
add_action( 'fc_checkout_after_contact_fields',
    /**
     * Add contact step footer.
     */
    function() {
        echo '<p>We will use this to contact you about your order</p>';
    },
    10
);
```
