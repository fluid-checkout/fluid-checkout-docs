```php
add_filter( 'fc_place_order_button_classes',
    /**
     * Add custom classes to place order button.
     *
     * @param string $classes CSS classes. Default button alt.
     * @return string Filtered value.
     */
    function( $classes ) {
        return $classes . ' custom-place-order-button';
    },
    10
);
```
