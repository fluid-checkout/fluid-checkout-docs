```php
add_filter( 'fc_order_summary_display_desktop_edit_cart_link',
    /**
     * Hide edit cart link.
     *
     * @param bool $enabled Whether the feature is enabled. Default true.
     * @return bool Filtered value.
     */
    function( $enabled ) {
        return false;
    },
    10
);
```
