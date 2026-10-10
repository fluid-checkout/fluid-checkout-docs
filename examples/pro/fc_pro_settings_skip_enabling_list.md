```php
add_filter( 'fc_pro_settings_skip_enabling_list',
    /**
     * Skip enabling specific PRO settings.
     *
     * @param array $value Filtered value. Default empty array.
     * @return array Filtered value.
     */
    function( $value ) {
        // Prevent these settings from being enabled via admin
        $value[] = 'fc_pro_setting_to_skip';

        return $value;
    },
    10
);
```
