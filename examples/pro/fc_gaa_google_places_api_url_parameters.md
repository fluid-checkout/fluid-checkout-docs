```php
add_filter( 'fc_gaa_google_places_api_url_parameters',
    /**
     * Force address suggestion result bias to US.
     *
     * @param array $parameters The Google Maps API URL parameters array containing. Below are the default parameters used by our plugin, but any URL parameter accepted by the Google Maps Javascript API can be used.
     * @return array Filtered value.
     */
    function( $parameters ) {
        $parameters['region'] = 'US';
        return $parameters;
    },
    10
);
```
