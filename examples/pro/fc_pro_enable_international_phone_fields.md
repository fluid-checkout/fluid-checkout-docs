```php
add_filter( 'fc_pro_enable_international_phone_fields',
    /**
     * Disable international phone fields.
     *
     * @param bool $is_enabled Whether international phone fields are enabled. Default value comes from plugin settings.
     * @return bool Filtered value.
     */
    function( $is_enabled ) {
        return false;
    },
    10
);
```
