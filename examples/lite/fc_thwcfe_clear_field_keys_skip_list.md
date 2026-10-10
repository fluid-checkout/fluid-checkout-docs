```php
add_filter( 'fc_thwcfe_clear_field_keys_skip_list',
    /**
     * Add custom field keys to skip when clearing THWCFE fields.
     *
     * @param array $skip Whether to skip the default behavior.
     * @return array Filtered value.
     */
    function( $skip ) {
        $skip[] = 'billing_custom_field';
        $skip[] = 'shipping_custom_field';
        return $skip;
    },
    10
);
```
