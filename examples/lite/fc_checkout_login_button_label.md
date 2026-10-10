```php
add_filter( 'fc_checkout_login_button_label',
    /**
     * Customize login button label.
     *
     * @param string $label Label text.
     * @return string Filtered value.
     */
    function( $label ) {
        return __( 'Sign In', 'your-text-domain' );
    },
    10
);
```
