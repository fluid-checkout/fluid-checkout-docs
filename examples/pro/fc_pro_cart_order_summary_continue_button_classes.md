```php
add_filter( 'fc_pro_cart_order_summary_continue_button_classes',
    /**
     * Add custom class to continue button.
     *
     * @param string $classes CSS classes. Default 'button'.
     * @return string Filtered value.
     */
    function( $classes ) {
        return $classes . ' custom-button-class';
    },
    10
);
```
