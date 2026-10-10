```php
add_filter( 'fc_login_form_wrapper_class',
    /**
     * Add custom classes to login form wrapper.
     *
     * @param string $classes CSS classes. Default empty string.
     * @return string Filtered value.
     */
    function( $classes ) {
        return 'custom-login-wrapper';
    },
    10
);
```
