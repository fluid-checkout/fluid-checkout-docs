```php
add_filter( 'fc_pro_address_book_js_settings',
    /**
     * Add custom JavaScript settings for address book.
     *
     * @param array $settings JavaScript settings array.
     * @return array Filtered value.
     */
    function( $settings ) {
        $settings['customSetting'] = 'custom_value';

        return $settings;
    },
    10
);
```
