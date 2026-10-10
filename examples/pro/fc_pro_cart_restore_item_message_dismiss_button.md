```php
add_filter( 'fc_pro_cart_restore_item_message_dismiss_button',
    /**
     * Add a custom class to the dismiss button link.
     *
     * @param string $value Filtered value.
     * @return string Filtered value.
     */
    function( $value ) {
        // Add a custom class while preserving the original structure
        return str_replace( 'class="restore-item-dismiss"', 'class="restore-item-dismiss my-custom-class"', $value );
    },
    10
);
```
