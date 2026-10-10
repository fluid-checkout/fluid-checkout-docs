```php
add_filter( 'fc_gaa_google_places_api_language',
    /**
     * This will force Brazilian Portuguese for Google Places API.
     *
     * @param string $language_code The language code for Google Places API responses. Set to an empty string to let the script decide the language based on the user’s device. See accepted languages in the Places API documentation.
     * @return string Filtered value.
     */
    function( $language_code ) {
        // Force Brazilian Portuguese
        return 'pt-BR';
    },
    10
);
```
