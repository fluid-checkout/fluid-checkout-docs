```php
add_filter( 'fc_checkout_header_logo_home_url',
    /**
     * Customize header logo home URL.
     *
     * @param mixed $url URL.
     * @return mixed Filtered value.
     */
    function( $url ) {
        return home_url( '/custom-landing-page/' );
    },
    10
);
```
