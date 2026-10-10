In `fc_substep_text_display_value_{field_type}_char`, `password` replaces `{field_type}`.

```php
add_filter( 'fc_substep_text_display_value_password_char',
    /**
     * Change password masking character.
     *
     * @param string $value Value to filter. Default *.
     * @return string Filtered value.
     */
    function( $value ) {
        return '.';
    },
    10
);
```
