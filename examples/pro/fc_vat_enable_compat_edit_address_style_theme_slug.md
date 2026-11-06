In `fc_vat_enable_compat_edit_address_style_{theme_slug}`, `astra` replaces `{theme_slug}`.

```php
add_filter( 'fc_vat_enable_compat_edit_address_style_astra',
    /**
     * Disable edit address style compatibility for a theme.
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
