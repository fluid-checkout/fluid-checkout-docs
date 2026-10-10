```php
add_filter( 'fc_pro_cart_action_button_class_proceed_checkout',
    /**
     * Add theme button class to proceed to checkout button.
     *
     * @param string $classes Space-separated CSS classes.
     * @return string Filtered value.
     */
    function( $classes ) {
        return $classes . ' theme-button-primary';
    },
    10
);
```
