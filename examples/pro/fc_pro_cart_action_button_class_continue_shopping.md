```php
add_filter( 'fc_pro_cart_action_button_class_continue_shopping',
    /**
     * Add custom class to continue shopping button.
     *
     * @param string $value Filtered value. Default empty.
     * @return string Filtered value.
     */
    function( $value ) {
        return $value . ' custom-button-class';
    },
    10
);
```
