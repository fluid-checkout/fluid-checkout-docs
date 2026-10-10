```php
add_filter( 'fc_checkout_login_button_classes',
    /**
     * Add custom classes to login button.
     *
     * @param string $classes CSS classes. Default woocommerce-button button.
     * @return string Filtered value.
     */
    function( $classes ) {
        return $classes . ' custom-login-btn';
    },
    10
);
```
