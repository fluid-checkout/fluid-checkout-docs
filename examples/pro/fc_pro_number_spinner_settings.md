```php
add_filter( 'fc_pro_number_spinner_settings',
    /**
     * Customize number spinner button placement.
     *
     * @param array $settings Settings.
     * @return array Filtered value.
     */
    function( $settings ) {
        $settings['numberSpinnerOptions']['buttonPlacement'] = 'before';
        return $settings;
    },
    10
);
```
