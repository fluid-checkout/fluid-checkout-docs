```php
add_filter( 'fc_pro_thwcfe_substep_text_display_value_show_field_label',
    /**
     * Hide field labels in review text.
     *
     * @param bool $show_label Whether to show field labels. Defaults to true.
     * @return bool Filtered value.
     */
    function( $show_label ) {
        return false;
    },
    10
);
```
