In `fc_substep_text_display_value_show_field_label_{field_type}`, `email` replaces `{field_type}`.

```php
add_filter( 'fc_substep_text_display_value_show_field_label_email',
    /**
     * Show labels for email fields in substep display.
     *
     * @param bool $show_field_label Whether to include the field label in the review text.
     * @return bool Filtered value.
     */
    function( $show_field_label ) {
        return true;
    },
    10
);
```
