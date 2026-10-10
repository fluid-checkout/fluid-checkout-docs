```php
add_filter( 'fc_gaa_google_places_api_script_dependencies',
    /**
     * Add custom dependency to Google Places API script.
     *
     * @param array $dependencies Array of script handles that the Google Places API script depends on. Defaults to the plugin’s defined dependencies.
     * @return array Filtered value.
     */
    function( $dependencies ) {
        $dependencies[] = 'custom-script-handle';
        return $dependencies;
    },
    10
);
```
