```php
add_filter( 'fc_expansible_section_toggle_label_add_optional_text',
    /**
     * Remove optional text from all toggle labels.
     *
     * @param bool $label Label text. Default true.
     * @return bool Filtered value.
     */
    function( $label ) {
        return false;
    },
    10
);
```
