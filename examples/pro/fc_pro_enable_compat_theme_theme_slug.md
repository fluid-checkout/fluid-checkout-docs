In `fc_pro_enable_compat_theme_{theme_slug}`, `twentytwentyfive` replaces `{theme_slug}`.

```php
add_filter( 'fc_pro_enable_compat_theme_twentytwentyfive',
    /**
     * Disable Twenty Twenty-Five theme compatibility.
     *
     * @param bool $enabled Whether to load the compatibility module for a specific theme. Default true.
     * @return bool Filtered value.
     */
    function( $enabled ) {
        return false;
    },
    10
);
```
