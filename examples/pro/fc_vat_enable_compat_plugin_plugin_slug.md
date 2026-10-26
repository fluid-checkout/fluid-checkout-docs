In `fc_vat_enable_compat_plugin_{plugin_slug}`, `fc-address-book` replaces `{plugin_slug}`.

```php
add_filter( 'fc_vat_enable_compat_plugin_fc-address-book',
    /**
     * Disable compatibility for a specific plugin.
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
