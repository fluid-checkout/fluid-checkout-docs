In `fc_adb_enable_compat_plugin_{plugin_slug}`, `fluid-checkout-pro` replaces `{plugin_slug}`.

```php
add_filter( 'fc_adb_enable_compat_plugin_fluid-checkout-pro',
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
