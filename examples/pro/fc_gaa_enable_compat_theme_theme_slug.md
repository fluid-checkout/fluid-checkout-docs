In `fc_gaa_enable_compat_theme_{theme_slug}`, `Divi` replaces `{theme_slug}`.

```php
add_filter( 'fc_gaa_enable_compat_theme_Divi',
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
