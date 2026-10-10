```php
add_filter( 'fc_checkout_address_i18n_override_locale_attributes',
    /**
     * Override locale attributes for address fields.
     *
     * @param array $override_attributes Attributes to override globally.
     * @return array Filtered value.
     */
    function( $override_attributes ) {
        $override_attributes[] = 'custom-attribute';
        return $override_attributes;
    },
    10
);
```
