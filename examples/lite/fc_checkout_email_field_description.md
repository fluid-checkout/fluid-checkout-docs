```php
add_filter( 'fc_checkout_email_field_description',
    /**
     * Customize email field description.
     *
     * @param string $value Value to filter.
     * @return string Filtered value.
     */
    function( $value ) {
        return __( 'We will send your order confirmation to this email address.', 'your-text-domain' );
    },
    10
);
```
