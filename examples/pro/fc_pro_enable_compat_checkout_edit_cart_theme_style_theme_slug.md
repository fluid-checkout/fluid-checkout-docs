In `fc_pro_enable_compat_checkout_edit_cart_theme_style_{theme_slug}`, `twentytwentyfive` replaces `{theme_slug}`.

```php
add_filter( 'fc_pro_enable_compat_checkout_edit_cart_theme_style_twentytwentyfive',
    /**
     * Disable checkout edit cart theme styles for Twenty Twenty-Five.
     *
     * @param bool $enabled Whether to load checkout edit-cart compatibility styles for a specific theme. Default true.
     * @return bool Filtered value.
     */
    function( $enabled ) {
        return false;
    },
    10
);
```
