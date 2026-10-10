```php
add_filter( 'fc_checkout_login_cta_text',
    /**
     * Customize login CTA text.
     *
     * @param string $text Text to display.
     * @return string Filtered value.
     */
    function( $text ) {
        return __( 'Returning customer?', 'my-theme' );
    },
    10
);
```
