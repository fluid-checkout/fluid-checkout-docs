```php
add_filter( 'fc_pro_settings_skip_enabling_list',
    /**
     * Skip enabling specific PRO settings.
     *
     * @param array $skip_list Array of setting IDs to skip enabling. Defaults to empty array.
     * @return array Filtered value.
     */
    function( $skip_list ) {
        // Prevent these settings from being enabled via admin
        $skip_list[] = 'fc_pro_setting_to_skip';

        return $skip_list;
    },
    10
);
```
