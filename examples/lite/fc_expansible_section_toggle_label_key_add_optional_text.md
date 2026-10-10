In `fc_expansible_section_toggle_label_{key}_add_optional_text`, `shipping_company` replaces `{key}`.

```php
add_filter( 'fc_expansible_section_toggle_label_shipping_company_add_optional_text',
    /**
     * Remove optional text from shipping_company toggle label.
     *
     * @param bool $value Value to filter. Default true.
     * @return bool Filtered value.
     */
    function( $value ) {
        return false;
    },
    10
);
```
