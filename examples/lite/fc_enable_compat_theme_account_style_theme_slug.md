In `fc_enable_compat_theme_account_style_{theme_slug}`, `twentytwentyfive` replaces `{theme_slug}`.

```php
add_filter( 'fc_enable_compat_theme_account_style_twentytwentyfive',
    /**
     * Disable account details theme style compatibility.
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
