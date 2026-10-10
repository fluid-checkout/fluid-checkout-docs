```php
add_filter( 'fc_shipping_method_display_package_name',
    /**
     * Show package names in shipping methods.
     *
     * @param bool $package_name Package name. Default false.
     * @return bool Filtered value.
     */
    function( $package_name ) {
        return true;
    },
    10
);
```
