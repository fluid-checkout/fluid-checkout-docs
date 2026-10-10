In `fc_adb_enable_compat_theme_{theme_slug}`, `twentytwentyfive` replaces `{theme_slug}`.

```php
add_filter( 'fc_adb_enable_compat_theme_twentytwentyfive',
    /**
     * Disable compatibility for a specific theme.
     *
     * @param bool $enabled Whether the compatibility features for this theme should be enabled or not. Defaults to true.
     * @return bool Filtered value.
     */
    function( $enabled ) {
        return false;
    },
    10
);
```
