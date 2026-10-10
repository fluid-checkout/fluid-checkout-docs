```php
add_filter( 'fc_update_fragments',
    /**
     * Customize this hook.
     *
     * @param array $value Value to filter. Default empty array.
     * @return array Filtered value.
     */
    function( $value ) {
        $html = $this->get_vat_number_field_html();
        $value['.fc-vat-number-field'] = $html;
        return $value;
    },
    10
);
```
