```php
add_filter( 'fc_pro_cart_removed_item_message',
    /**
     * Customize removed item message.
     *
     * @param string $message Message text.
     * @return string Filtered value.
     */
    function( $message ) {
        return __( '%s has been removed from your shopping cart.', 'text-domain' );
    },
    10
);
```
