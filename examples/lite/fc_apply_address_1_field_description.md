```php
add_filter( 'fc_apply_address_1_field_description',
    /**
     * Disable address 1 field description.
     *
     * @param bool $value Value to filter. Default true.
     * @return bool Filtered value.
     */
    function( $value ) {
        return false;
    },
    10
);
```
