```php
add_filter( 'fc_pro_cart_item_quantity_input_readonly_enabled',
    /**
     * Make quantity inputs readonly.
     *
     * @param bool $readonly Whether quantity inputs are readonly. Defaults to false.
     * @return bool Filtered value.
     */
    function( $readonly ) {
        return true;
    },
    10
);
```
