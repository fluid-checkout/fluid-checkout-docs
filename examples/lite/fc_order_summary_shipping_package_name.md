```php
add_filter( 'fc_order_summary_shipping_package_name',
    /**
     * Customize shipping package name in order summary.
     *
     * @param string $package_name Package name.
     * @param WC_Shipping_Rate $method Method.
     * @param int $package_index Zero-based package index.
     * @param array $package Shipping package data.
     * @return string Filtered value.
     */
    function( $package_name, $method, $package_index, $package ) {
         return sprintf( __( 'Package %d', 'my-theme' ), $package_index + 1 );

        return $package_name;
    },
    10,
    4
);
```
