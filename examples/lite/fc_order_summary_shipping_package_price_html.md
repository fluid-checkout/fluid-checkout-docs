```php
add_filter( 'fc_order_summary_shipping_package_price_html',
    /**
     * Add custom text to shipping price.
     *
     * @param string $shipping_total_label Shipping total label.
     * @param \WC_Shipping_Rate $method Method.
     * @param int $package_index Zero-based package index.
     * @param array $package Shipping package data.
     * @param string $package_name Package name.
     * @return string Filtered value.
     */
    function( $shipping_total_label, $method, $package_index, $package, $package_name ) {
        if ( $method && $method->get_cost() == 0 ) {
            return '<strong>' . __( 'FREE', 'my-theme' ) . '</strong>';
        }
        return $shipping_total_label;
    },
    10,
    5
);
```
