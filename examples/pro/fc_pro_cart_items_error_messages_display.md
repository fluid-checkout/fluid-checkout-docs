```php
add_filter( 'fc_pro_cart_items_error_messages_display',
    /**
     * Hide cart item error messages.
     *
     * @param bool $display Whether to display cart items error messages display. Default true.
     * @return bool Filtered value.
     */
    function( $display ) {
        return false;
    },
    10
);
```
