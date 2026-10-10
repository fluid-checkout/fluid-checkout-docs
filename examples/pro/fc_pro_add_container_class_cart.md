```php
add_filter( 'fc_pro_add_container_class_cart',
    /**
     * Enable FC container class for cart.
     *
     * @param bool $add_container Whether to add the container class. Defaults to false.
     * @return bool Filtered value.
     */
    function( $add_container ) {
        return true;
    },
    10
);
```
