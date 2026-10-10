```php
add_action( 'fc_checkout_below_contact_login_cta',
    /**
     * Add additional login options.
     */
    function() {
        echo '<div class="additional-login" style="text-align: center;">Quick & secure login</div>';
    },
    10
);
```
