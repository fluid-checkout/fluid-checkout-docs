```php
add_filter( 'fc_pro_cart_item_quantity_limit_animation_enabled',
    /**
     * Disable quantity limit animation.
     *
     * @param bool $enabled Whether to enable cart item quantity limit animationd. Default true.
     * @return bool Filtered value.
     */
    function( $enabled ) {
        return false;
    },
    10
);
```
