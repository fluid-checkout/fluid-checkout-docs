Note that for the checkout page no {$page} modifier is used: fc_adb_enable_compat_plugin_style_{$plugin_slug}

In `fc_adb_enable_compat_plugin_style_{plugin_slug}`, `fluid-checkout-pro` replaces `{plugin_slug}`.

```php
add_filter( 'fc_adb_enable_compat_plugin_style_fluid-checkout-pro',
    /**
     * Disable Checkout plugin style compatibility.
     *
     * @param bool $enabled Whether the compatibility styles for this plugin should be enabled or not. Defaults to true.
     * @return bool Filtered value.
     */
    function( $enabled ) {
        return false;
    },
    10
);
```

```php
add_filter( 'fc_adb_enable_compat_cart_plugin_style_fluid-checkout-pro',
    /**
     * Disable Cart plugin style compatibility.
     *
     * @return mixed Filtered value.
     */
    function() {
        return false;
    },
    10
);
```

```php
add_filter( 'fc_adb_enable_compat_edit_address_plugin_style_fluid-checkout-pro',
    /**
     * Disable Edit Address plugin style compatibility.
     *
     * @return mixed Filtered value.
     */
    function() {
        return false;
    },
    10
);
```
