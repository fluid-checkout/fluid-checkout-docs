```php
add_filter( 'fc_checkout_social_login_separator_text',
    /**
     * Customize social login separator text.
     *
     * @param string $text Text to display.
     * @return string Filtered value.
     */
    function( $text ) {
        // This will be used regardless of guest checkout setting
        return __( 'Or continue with Social Login', 'your-text-domain' );
    },
    10
);
```
