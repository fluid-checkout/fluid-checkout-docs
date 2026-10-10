In `fc_pro_enable_compat_theme_{theme_slug}`, `twentytwentyfive` replaces `{theme_slug}`.

```php
add_filter( 'fc_pro_enable_compat_theme_twentytwentyfive',
    /**
     * Disable Twenty Twenty-Five theme compatibility.
     *
     * @param bool $is_enabled Whether the theme compatibility file should be loaded. Defaults to true.
     * @return bool Filtered value.
     */
    function( $is_enabled ) {
        return false;
    },
    10
);
```
