```php
add_filter( 'fc_login_form_class',
    /**
     * Add custom classes to login form.
     *
     * @param string $classes CSS classes. Default empty string.
     * @return string Filtered value.
     */
    function( $classes ) {
        return 'custom-login-form';
    },
    10
);
```
