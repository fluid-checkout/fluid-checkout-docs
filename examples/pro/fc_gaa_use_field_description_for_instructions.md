```php
add_filter( 'fc_gaa_use_field_description_for_instructions',
    /**
     * Enable field descriptions for instructions.
     *
     * @param bool $use_description Whether to use field descriptions for instructions. Defaults to false.
     * @return bool Filtered value.
     */
    function( $use_description ) {
        return true;
    },
    10
);
```
