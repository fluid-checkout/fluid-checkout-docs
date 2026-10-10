```php
add_action( 'fc_checkout_social_login',
    /**
     * Adds div to Social Login section.
     */
    function() {
        echo '<div class="social-login" style="text-align: center;">Social login</div>';
    },
    10
);
```
