```php
add_filter( 'fc_compat_theme_woodmart_disable_theme_checkout_options',
    /**
     * Enable Woodmart theme checkout options.
     *
     * @param bool $value Value to filter. Default false.
     * @return bool Filtered value.
     */
    function( $value ) {
        return false;
    },
    10
);
```
