```php
add_filter( 'fc_shipping_method_substep_text_package_review_text_lines',
    /**
     * Customize package review text lines.
     *
     * @param string $package_review_text_lines Package review text lines.
     * @param mixed $recurring_cart_package_key Recurring cart package key.
     * @param array $package Shipping package data.
     * @param mixed $chosen_recurring_method Chosen recurring method.
     * @param \WC_Shipping_Rate $method Method.
     * @return string Filtered value.
     */
    function( $package_review_text_lines, $recurring_cart_package_key, $package, $chosen_recurring_method, $method ) {
        // Add custom line at the beginning
        array_unshift( $package_review_text_lines, __( 'Review your shipping:', 'my-theme' ) );
        return $package_review_text_lines;
    },
    10,
    5
);
```
