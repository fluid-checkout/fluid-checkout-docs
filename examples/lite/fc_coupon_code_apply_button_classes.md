```php
add_filter( 'fc_coupon_code_apply_button_classes',
    /**
     * Add custom classes to coupon code apply button.
     *
     * @param string $classes CSS classes. Default button.
     * @return string Filtered value.
     */
    function( $classes ) {
        return $classes . ' custom-button-class';
    },
    10
);
```
