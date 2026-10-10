```php
add_filter( 'fc_checkout_login_input_classes',
    /**
     * Add custom classes to login inputs.
     *
     * @param string $classes CSS classes. Default empty string.
     * @return string Filtered value.
     */
    function( $classes ) {
        return 'custom-login-inputs-class';
    },
    10
);
```
