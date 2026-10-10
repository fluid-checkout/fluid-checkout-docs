```php
add_filter( 'fc_pro_cart_button_class_proceed_checkout',
    /**
     * Customize proceed to checkout button classes.
     *
     * @param string $value Filtered value. Default 'button alt wc-forward'.
     * @return string Filtered value.
     */
    function( $value ) {
        return 'button alt wc-forward custom-class';
    },
    10
);
```
