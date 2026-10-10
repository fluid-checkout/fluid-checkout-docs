```php
add_filter( 'fc_pro_cart_display_items_count',
    /**
     * Hide cart items count.
     *
     * @param bool $display_count Whether to display the items count. Defaults to true.
     * @return bool Filtered value.
     */
    function( $display_count ) {
        return false;
    },
    10
);
```
