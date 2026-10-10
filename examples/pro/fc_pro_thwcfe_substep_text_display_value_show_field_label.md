```php
add_filter( 'fc_pro_thwcfe_substep_text_display_value_show_field_label',
    /**
     * Hide field labels in review text.
     *
     * @param bool $show_field_label Whether to display thwcfe substep text display value show field label.
     * @return bool Filtered value.
     */
    function( $show_field_label ) {
        return false;
    },
    10
);
```
