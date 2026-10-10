```php
add_filter( 'fc_pro_cart_display_items_count',
    /**
     * Hide cart items count.
     *
     * @param bool $display Whether to display cart display items count. Default true.
     * @return bool Filtered value.
     */
    function( $display ) {
        return false;
    },
    10
);
```
