```php
add_filter( 'fc_pro_cart_action_label_continue_shopping',
    /**
     * Customize continue shopping label.
     *
     * @param string $value Filtered value.
     * @return string Filtered value.
     */
    function( $value ) {
        return __( 'Keep Shopping', 'text-domain' );
    },
    10
);
```
