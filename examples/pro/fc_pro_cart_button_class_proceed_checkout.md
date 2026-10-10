```php
add_filter( 'fc_pro_cart_button_class_proceed_checkout',
    /**
     * Customize proceed to checkout button classes.
     *
     * @param string $classes Space-separated CSS classes. Defaults to button alt wc-forward.
     * @return string Filtered value.
     */
    function( $classes ) {
        return 'button alt wc-forward custom-class';
    },
    10
);
```
