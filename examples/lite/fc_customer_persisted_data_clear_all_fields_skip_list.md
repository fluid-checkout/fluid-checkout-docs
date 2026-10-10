```php
add_filter( 'fc_customer_persisted_data_clear_all_fields_skip_list',
    /**
     * Preserve additional fields when clearing all data.
     *
     * @param array $skip Whether to skip the default behavior.
     * @return array Filtered value.
     */
    function( $skip ) {
        $skip[] = 'custom_preferences';
        return $skip;
    },
    10
);
```
