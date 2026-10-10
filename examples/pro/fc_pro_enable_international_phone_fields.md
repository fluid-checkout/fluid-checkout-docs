```php
add_filter( 'fc_pro_enable_international_phone_fields',
    /**
     * Disable international phone fields.
     *
     * @param bool $enabled Whether international phone fields are enabled.
     * @return bool Filtered value.
     */
    function( $enabled ) {
        return false;
    },
    10
);
```
