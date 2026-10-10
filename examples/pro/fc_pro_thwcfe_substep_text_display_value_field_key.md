In `fc_pro_thwcfe_substep_text_display_value_{field_key}`, `delivery_notes` replaces `{field_key}`.

```php
add_filter( 'fc_pro_thwcfe_substep_text_display_value_delivery_notes',
    /**
     * Customize display value for a specific custom field.
     *
     * @param string $field_display_value The formatted display value for the field.
     * @param mixed $field_value The raw field value.
     * @param string $field_key The field key/name.
     * @param array $field_args The field arguments/configuration.
     * @return string Filtered value.
     */
    function( $field_display_value, $field_value, $field_key, $field_args ) {
        // Add icon before delivery notes
        return '📦 ' . $field_display_value;
    },
    10,
    4
);
```
