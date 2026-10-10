In `fc_gaa_enable_compat_plugin_{plugin_slug}`, `woocommerce-myparcel` replaces `{plugin_slug}`.

```php
add_filter( 'fc_gaa_enable_compat_plugin_woocommerce-myparcel',
    /**
     * Disable compatibility for a specific plugin.
     *
     * @param bool $enabled Whether the compatibility features for this plugin should be enabled or not. Defaults to true.
     * @return bool Filtered value.
     */
    function( $enabled ) {
        return false;
    },
    10
);
```
