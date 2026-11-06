In `fc_vat_enable_compat_theme_{theme_slug}`, `hello-elementor` replaces `{theme_slug}`.

```php
add_filter( 'fc_vat_enable_compat_theme_hello-elementor',
    /**
     * Disable compatibility for a specific theme.
     *
     * @param bool $enabled Whether to load the compatibility file. Default true. Anything other than true skips it.
     * @return bool Filtered value.
     */
    function( $enabled ) {
        return false;
    },
    10
);
```
