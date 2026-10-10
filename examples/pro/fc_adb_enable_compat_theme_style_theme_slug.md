Note that for the checkout page no {$page} modifier is used: fc_adb_enable_compat_theme_style_{$theme_slug}

In `fc_adb_enable_compat_theme_style_{theme_slug}`, `twentytwentyfive` replaces `{theme_slug}`.

```php
add_filter( 'fc_adb_enable_compat_theme_style_twentytwentyfive',
    /**
     * Disable Checkout theme style compatibility.
     *
     * @param bool $enabled Whether the compatibility styles for this theme should be enabled or not. Defaults to true.
     * @return bool Filtered value.
     */
    function( $enabled ) {
        return false;
    },
    10
);
```

```php
add_filter( 'fc_adb_enable_compat_cart_theme_style_twentytwentyfive',
    /**
     * Disable Cart theme style compatibility.
     *
     * @return mixed Filtered value.
     */
    function() {
        return false;
    },
    10
);
```

Note that for Edit Address we use only style instead of theme_style.

```php
add_filter( 'fc_adb_enable_compat_edit_address_style_twentytwentyfive',
    /**
     * Disable Edit Address theme style compatibility.
     *
     * @return mixed Filtered value.
     */
    function() {
        return false;
    },
    10
);
```
