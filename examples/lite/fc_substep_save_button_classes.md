```php
add_filter( 'fc_substep_save_button_classes',
    /**
     * Add custom classes to substep save button.
     *
     * @param string $classes CSS classes. Default button.
     * @return string Filtered value.
     */
    function( $classes ) {
        return $classes . ' custom-save-button';
    },
    10
);
```
