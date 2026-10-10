```php
add_filter( 'fc_pro_cart_shipping_calculator_show_for_multiple_packages',
    /**
     * Show shipping calculator for all packages.
     *
     * @param bool $value Whether cart shipping calculator show for multiple packages. Default false.
     * @param array $packages Shipping packages.
     * @return bool Filtered value.
     */
    function( $value, $packages ) {
        return true;
    },
    10,
    2
);
```
