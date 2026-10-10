In `fc_pro_enable_compat_{page}_theme_style_{theme_slug}`, `checkout_edit_cart` replaces `{page}` and `twentytwentyfive` replaces `{theme_slug}`.

```php
add_filter( 'fc_pro_enable_compat_checkout_edit_cart_theme_style_twentytwentyfive',
    /**
     * Disable checkout edit cart theme styles for Twenty Twenty-Five.
     *
     * @param bool $is_enabled Whether the theme compatibility styles should be loaded. Defaults to true.
     * @return bool Filtered value.
     */
    function( $is_enabled ) {
        return false;
    },
    10
);
```
