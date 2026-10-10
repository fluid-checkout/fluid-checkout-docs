```php
add_filter( 'fc_login_form_inner_class',
    /**
     * Add custom classes to login form inner element.
     *
     * @param string $classes CSS classes. Default empty string.
     * @return string Filtered value.
     */
    function( $classes ) {
        return 'custom-login-inner';
    },
    10
);
```
