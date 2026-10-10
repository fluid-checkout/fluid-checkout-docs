```php
add_filter( 'fc_next_step_button_classes',
    /**
     * Add custom classes to next step button.
     *
     * @param array $classes CSS classes.
     * @return array Filtered value.
     */
    function( $classes ) {
        $classes[] = 'custom-button';
        return $classes;
    },
    10
);
```
