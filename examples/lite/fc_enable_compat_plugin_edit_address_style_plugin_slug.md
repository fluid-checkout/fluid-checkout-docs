In `fc_enable_compat_plugin_edit_address_style_{plugin_slug}`, `fc-vat-assistant` replaces `{plugin_slug}`.

```php
add_filter( 'fc_enable_compat_plugin_edit_address_style_fc-vat-assistant',
    /**
     * Disable edit address plugin style compatibility.
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
