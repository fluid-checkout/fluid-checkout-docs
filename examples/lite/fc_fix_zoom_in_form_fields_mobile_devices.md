```php
add_filter( 'fc_fix_zoom_in_form_fields_mobile_devices',
    /**
     * Disable mobile zoom fix.
     *
     * @param string $value Value to filter.
     * @return string Filtered value.
     */
    function( $value ) {
        return false;
    },
    10
);
```
