```php
add_filter( 'fc_fragments_update_settings',
    /**
     * Add custom fragments update settings.
     *
     * @param array $settings Settings to output.
     * @return array Filtered value.
     */
    function( $settings ) {
        // Add custom settings
        $settings['customSetting'] = 'custom-value';

        // Return modified settings
        return $settings;
    },
    10
);
```
