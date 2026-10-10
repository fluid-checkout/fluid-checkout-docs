```php
add_filter( 'fc_apply_address_2_field_description',
    /**
     * Disable address 2 field description.
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
