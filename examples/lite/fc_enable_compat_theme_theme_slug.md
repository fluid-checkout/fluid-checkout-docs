In `fc_enable_compat_theme_{theme_slug}`, `shoptimizer` replaces `{theme_slug}`.

```php
add_filter( 'fc_enable_compat_theme_shoptimizer',
    /**
     * Disable compatibility for a specific theme.
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
