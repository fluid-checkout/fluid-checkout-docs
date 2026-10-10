```php
add_filter( 'fc_pro_intl_tel_input_settings',
    /**
     * Customize international phone field settings.
     *
     * @param array $settings The intl-tel-input settings array containing configuration options.
     * @return array Filtered value.
     */
    function( $settings ) {
        // add custom data
        $settings['customData'] = 'custom_data';

        return $settings;
    },
    10
);
```
