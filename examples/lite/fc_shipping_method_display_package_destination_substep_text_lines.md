```php
add_filter( 'fc_shipping_method_display_package_destination_substep_text_lines',
    /**
     * Hide package destination in substep text.
     *
     * @param bool $text Text to display. Default true.
     * @return bool Filtered value.
     */
    function( $text ) {
        return false;
    },
    10
);
```
