```php
add_filter( 'fc_order_summary_continue_button_classes',
    /**
     * Add custom classes to order summary continue button.
     *
     * @param string $classes CSS classes. Default button.
     * @return string Filtered value.
     */
    function( $classes ) {
        return $classes . ' custom-continue-button-class';
    },
    10
);
```
