```php
add_filter( 'fc_pro_view_order_section_hook_priority_order_overview',
    /**
     * Move Order Actions to after all order sections.
     *
     * @param mixed $value Filtered value.
     * @return mixed Filtered value.
     */
    function( $value ) {
        // Only modify when "inside_order_overview" position is selected
        if ( 'fc_pro_order_overview_after' === $value[0] ) {
            $value[0] = 'woocommerce_view_order';  // Change location
            $value[2] = 65;  // Adjust priority
        }

        return $value;
    },
    10
);
```
