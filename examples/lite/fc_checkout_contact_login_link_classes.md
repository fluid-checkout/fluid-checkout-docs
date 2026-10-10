```php
add_filter( 'fc_checkout_contact_login_link_classes',
    /**
     * Customize login button class.
     *
     * @param string $classes CSS classes. Default fc-contact-login__action--underline.
     * @return string Filtered value.
     */
    function( $classes ) {
        $classes .= ' custom-button-class';
        return $classes;
    },
    10
);
```
