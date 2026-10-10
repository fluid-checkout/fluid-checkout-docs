```php
add_filter( 'fc_output_checkout_contact_logout_cta_section',
    /**
     * Show logout CTA section for logged-in users.
     *
     * @param string $value Value to filter. Default no.
     * @return string Filtered value.
     */
    function( $value ) {
        return 'yes';
    },
    10
);
```
