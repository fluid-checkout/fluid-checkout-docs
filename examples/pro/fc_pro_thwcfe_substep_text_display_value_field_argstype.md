In `fc_pro_thwcfe_substep_text_display_value_{field_args}type`, `select` is the field type (`$field_args['type']`).

```php
add_filter( 'fc_pro_thwcfe_substep_text_display_value_select',
    /**
     * Customize display value for all select fields.
     *
     * @param string $field_display_value Formatted field value.
     * @param mixed $field_value Raw field value.
     * @param string $field_key Checkout field key.
     * @param array $field_args Checkout field arguments.
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
