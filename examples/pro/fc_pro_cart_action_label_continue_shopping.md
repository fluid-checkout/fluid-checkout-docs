```php
add_filter( 'fc_pro_cart_action_label_continue_shopping',
    /**
     * Customize continue shopping label.
     *
     * @param string $label The continue shopping label.
     * @return string Filtered value.
     */
    function( $label ) {
        return __( 'Keep Shopping', 'text-domain' );
    },
    10
);
```
