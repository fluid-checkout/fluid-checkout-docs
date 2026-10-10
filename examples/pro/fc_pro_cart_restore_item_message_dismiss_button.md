```php
add_filter( 'fc_pro_cart_restore_item_message_dismiss_button',
    /**
     * Add a custom class to the dismiss button link.
     *
     * @param string $button_html The dismiss button HTML. Default is a link element with class restore-item-dismiss and data attribute data-cart_item_key.
     * @return string Filtered value.
     */
    function( $button_html ) {
        // Add a custom class while preserving the original structure
        return str_replace( 'class="restore-item-dismiss"', 'class="restore-item-dismiss my-custom-class"', $button_html );
    },
    10
);
```
