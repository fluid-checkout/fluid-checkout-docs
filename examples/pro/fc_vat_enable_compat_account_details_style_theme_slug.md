In `fc_vat_enable_compat_account_details_style_{theme_slug}`, `astra` replaces `{theme_slug}`.

```php
add_filter( 'fc_vat_enable_compat_account_details_style_astra',
    /**
     * Disable account details style compatibility for a theme.
     *
     * @param bool $enabled Whether to load the stylesheet. Default true. Anything other than true skips it.
     * @return bool Filtered value.
     */
    function( $enabled ) {
        return false;
    },
    10
);
```
