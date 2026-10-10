```php
add_filter( 'fc_checkout_login_modal_title',
    /**
     * Customize login modal title.
     *
     * @param string $title Title text.
     * @return string Filtered value.
     */
    function( $title ) {
        return __( 'Sign In', 'my-theme' );
    },
    10
);
```
