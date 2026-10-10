```php
add_filter( 'fc_add_phone_localisation_formats',
    /**
     * Disable phone number in formatted addresses.
     *
     * @param string $value Value to filter. Default yes.
     * @return string Filtered value.
     */
    function( $value ) {
        return 'no';
    },
    150
);
```
