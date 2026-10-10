```php
add_filter( 'fc_pro_cart_item_quantity_limit_animation_enabled',
    /**
     * Disable quantity limit animation.
     *
     * @param bool $enabled Whether the animation is enabled. Defaults to true.
     * @return bool Filtered value.
     */
    function( $enabled ) {
        return false;
    },
    10
);
```
