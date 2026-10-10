```php
add_filter( 'fc_pro_cart_shipping_calculator_show_for_multiple_packages',
    /**
     * Show shipping calculator for all packages.
     *
     * @param bool $show_multiple Whether to show calculator for multiple packages. Defaults to false.
     * @param array $packages Array of shipping packages.
     * @return bool Filtered value.
     */
    function( $show_multiple, $packages ) {
        return true;
    },
    10,
    2
);
```
