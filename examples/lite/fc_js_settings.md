```php
add_filter( 'fc_js_settings',
    /**
     * Add custom JavaScript settings.
     *
     * @param array $settings Settings to output.
     * @return array Filtered value.
     */
    function( $settings ) {
        $settings['customFeature'] = array(
            'enabled' => true,
        );
        return $settings;
    },
    10
);
```
