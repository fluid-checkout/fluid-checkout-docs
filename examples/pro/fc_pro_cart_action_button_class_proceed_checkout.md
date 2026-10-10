```php
add_filter( 'fc_pro_cart_action_button_class_proceed_checkout',
    /**
     * Add theme button class to proceed to checkout button.
     *
     * @param string $value Filtered value. Default empty.
     * @return string Filtered value.
     */
    function( $value ) {
        return $value . ' theme-button-primary';
    },
    10
);
```
