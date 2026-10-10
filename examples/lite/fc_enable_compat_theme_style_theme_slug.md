Note that for the checkout page no {$page} modifier is used: fc_enable_compat_theme_style_{$theme_slug}

In `fc_enable_compat_theme_style_{theme_slug}`, `twentytwentyfive` replaces `{theme_slug}`.

```php
add_filter( 'fc_enable_compat_theme_style_twentytwentyfive',
    /**
     * Disable Checkout theme style compatibility.
     *
     * @param bool $value Value to filter. Default true.
     * @return bool Filtered value.
     */
    function( $value ) {
        return false;
    },
    10
);
```
