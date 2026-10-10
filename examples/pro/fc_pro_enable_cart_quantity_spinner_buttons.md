```php
add_filter( 'fc_pro_enable_cart_quantity_spinner_buttons',
    /**
     * Disable quantity spinner buttons.
     *
     * @param bool $enabled Whether cart quantity fields use spinner buttons. Default true.
     * @return bool Filtered value.
     */
    function( $enabled ) {
        return false;
    },
    10
);
```
