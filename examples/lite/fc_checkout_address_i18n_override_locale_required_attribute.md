```php
add_filter( 'fc_checkout_address_i18n_override_locale_required_attribute',
    /**
     * Override locale required attributes with checkout field attributes.
     *
     * @param bool $override_required Whether to override the required attribute for address i18n.
     * @return bool Filtered value.
     */
    function( $override_required ) {
        return true;
    },
    10
);
```
