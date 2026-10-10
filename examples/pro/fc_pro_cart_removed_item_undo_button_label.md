```php
add_filter( 'fc_pro_cart_removed_item_undo_button_label',
    /**
     * Customize undo button label.
     *
     * @param string $label Label text.
     * @return string Filtered value.
     */
    function( $label ) {
        return __( 'Restore item', 'text-domain' );
    },
    10
);
```
