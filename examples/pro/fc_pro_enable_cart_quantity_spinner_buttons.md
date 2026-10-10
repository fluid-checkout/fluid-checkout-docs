```php
add_filter( 'fc_pro_enable_cart_quantity_spinner_buttons',
    /**
     * Disable quantity spinner buttons.
     *
     * @param bool $is_enabled Whether quantity spinner buttons are enabled. Defaults to true.
     * @return bool Filtered value.
     */
    function( $is_enabled ) {
        return false;
    },
    10
);
```
