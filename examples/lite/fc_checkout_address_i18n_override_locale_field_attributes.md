```php
add_filter( 'fc_checkout_address_i18n_override_locale_field_attributes',
    /**
     * Override locale attributes for address fields.
     *
     * @param array $override_field_attributes Field keys mapped to lists of attribute keys to override. Ie. array( 'shipping_phone' => array( 'label', 'required' ) ).
     * @return array Filtered value.
     */
    function( $override_field_attributes ) {
        $override_field_attributes = array_merge( $override_field_attributes, array(
            'shipping_phone' => array( 'label', 'required' )
        ) );

        return $override_field_attributes;
    },
    10
);
```
