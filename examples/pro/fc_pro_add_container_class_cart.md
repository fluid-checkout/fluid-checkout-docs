```php
add_filter( 'fc_pro_add_container_class_cart',
    /**
     * Enable FC container class for cart.
     *
     * @param bool $value Whether add container class cart. Default false.
     * @return bool Filtered value.
     */
    function( $value ) {
        return true;
    },
    10
);
```
