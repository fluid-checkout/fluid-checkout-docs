```php
add_filter( 'fc_pro_cart_shipping_calculator_button_classes',
    /**
     * Add theme button class to shipping calculator.
     *
     * @param mixed $classes CSS classes.
     * @return mixed Filtered value.
     */
    function( $classes ) {
        return $classes . ' button-custom-class';
    },
    10
);
```

```php
add_filter( 'fc_pro_cart_shipping_calculator_button_classes',
    /**
     * Add custom CSS classes to shipping calculator button.
     *
     * @param mixed $classes CSS classes.
     * @return mixed Filtered value.
     */
    function( $classes ) {
        $classes .= ' custom-shipping-btn btn-primary';
        return $classes;
    },
    10
);
```
