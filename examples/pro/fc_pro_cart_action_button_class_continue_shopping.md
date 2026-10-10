```php
add_filter( 'fc_pro_cart_action_button_class_continue_shopping',
    /**
     * Add custom class to continue shopping button.
     *
     * @param string $classes Space-separated CSS classes.
     * @return string Filtered value.
     */
    function( $classes ) {
        return $classes . ' custom-button-class';
    },
    10
);
```
