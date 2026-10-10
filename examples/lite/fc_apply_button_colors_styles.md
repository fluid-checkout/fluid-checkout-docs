```php
add_filter( 'fc_apply_button_colors_styles',
    /**
     * Enable custom button colors.
     *
     * @param bool $value Value to filter. Default false.
     * @return bool Filtered value.
     */
    function( $value ) {
        return true;
    },
    10
);
```
