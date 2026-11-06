In `fc_vat_enable_compat_edit_address_plugin_style_{plugin_slug}`, `woocommerce-germanized-pro` replaces `{plugin_slug}`.

```php
add_filter( 'fc_vat_enable_compat_edit_address_plugin_style_woocommerce-germanized-pro',
    /**
     * Disable edit address plugin style compatibility.
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
