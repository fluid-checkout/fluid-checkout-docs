```php
add_filter( 'fc_gaa_display_legacy_api_settings',
    /**
     * Force display Google Places API (Legacy) settings.
     *
     * @param bool $should_display Whether to force displaying the the options for the Places API (Legacy) in the plugin settings. Defaults to false, not forcing display.
     * @return bool Filtered value.
     */
    function( $should_display ) {
        return true;
    },
    10
);
```
