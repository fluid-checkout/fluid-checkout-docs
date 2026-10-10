In `fc_pro_thwcfe_substep_text_display_value_{field_type}`, `select` replaces `{field_type}`.

```php
add_filter( 'fc_pro_thwcfe_substep_text_display_value_select',
    /**
     * Customize display value for all select fields.
     *
     * @param string $field_display_value The formatted display value for the field.
     * @param mixed $field_value The raw field value.
     * @param string $field_key The field key/name.
     * @param array $field_args The field arguments/configuration.
     * @return string Filtered value.
     */
    function( $field_display_value, $field_value, $field_key, $field_args ) {
        // Add custom formatting for select fields
        return '→ ' . $field_display_value;
    },
    10,
    4
);
```
