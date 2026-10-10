```php
add_filter( 'fc_pro_intl_tel_input_settings',
    /**
     * Customize international phone field settings.
     *
     * @param array $intl_tel_input_settings The intl tel input settings.
     * @return array Filtered value.
     */
    function( $intl_tel_input_settings ) {
        // add custom data
        $intl_tel_input_settings['customData'] = 'custom_data';

        return $intl_tel_input_settings;
    },
    10
);
```
