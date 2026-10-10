```php
add_filter( 'fc_pro_cart_item_quantity_input_readonly_enabled',
    /**
     * Make quantity inputs readonly.
     *
     * @param bool $enabled Whether to enable cart item quantity input readonlyd. Default false.
     * @return bool Filtered value.
     */
    function( $enabled ) {
        return true;
    },
    10
);
```
