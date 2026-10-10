```php
add_filter( 'fc_substep_text_display_value_show_field_label',
    /**
     * Show field labels in substep display.
     *
     * @param bool $label Label text. Default false.
     * @return bool Filtered value.
     */
    function( $label ) {
        return true;
    },
    10
);
```
