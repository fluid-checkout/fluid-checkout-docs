```php
add_filter( 'fc_checkout_update_fields_selectors',
    /**
     * Add custom field selectors for checkout updates.
     *
     * @param array $value Value to filter.
     * @return array Filtered value.
     */
    function( $value ) {
        $value[] = '.custom-field input';
        return $value;
    },
    10
);
```
