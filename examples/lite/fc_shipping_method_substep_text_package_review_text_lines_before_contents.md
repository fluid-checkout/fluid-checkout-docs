```php
add_filter( 'fc_shipping_method_substep_text_package_review_text_lines_before_contents',
    /**
     * Add custom text before package contents.
     *
     * @param string $package_review_text_lines Package review text lines.
     * @param mixed $recurring_cart_package_key Recurring cart package key.
     * @param array $package Shipping package data.
     * @param mixed $chosen_recurring_method Chosen recurring method.
     * @param WC_Shipping_Rate $method Method.
     * @return string Filtered value.
     */
    function( $package_review_text_lines, $recurring_cart_package_key, $package, $chosen_recurring_method, $method ) {
        $package_review_text_lines[] = __( 'Package details:', 'my-theme' );
        return $package_review_text_lines;
    },
    10,
    5
);
```
