```php
add_filter( 'fc_output_checkout_contact_login_cta_section',
    /**
     * Hide login CTA section.
     *
     * @param string $value Value to filter. Default yes.
     * @return string Filtered value.
     */
    function( $value ) {
        return 'no';
    },
    10
);
```
