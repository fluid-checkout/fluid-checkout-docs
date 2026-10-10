```php
add_filter( 'fc_pro_cart_items_error_messages_display',
    /**
     * Hide cart item error messages.
     *
     * @param bool $display_errors Whether to display error messages. Defaults to true.
     * @return bool Filtered value.
     */
    function( $display_errors ) {
        return false;
    },
    10
);
```
