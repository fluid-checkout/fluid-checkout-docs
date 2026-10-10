```php
add_filter( 'fc_checkout_validation_brazilian_documents_script_settings',
    /**
     * Customize Brazilian document validation settings.
     *
     * @param array $settings Settings to output.
     * @return array Filtered value.
     */
    function( $settings ) {
        $settings['customValue'] = 'custom-value';

        return $settings;
    },
    10
);
```
