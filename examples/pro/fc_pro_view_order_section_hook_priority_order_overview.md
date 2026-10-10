```php
add_filter( 'fc_pro_view_order_section_hook_priority_order_overview',
    /**
     * Move Order Actions to after all order sections.
     *
     * @param array $priority Array with 3 elements: array( 'hook_name', 'callback', priority_number )
     * @return array Filtered value.
     */
    function( $priority ) {
        // Only modify when "inside_order_overview" position is selected
        if ( 'fc_pro_order_overview_after' === $priority[0] ) {
            $priority[0] = 'woocommerce_view_order';  // Change location
            $priority[2] = 65;  // Adjust priority
        }

        return $priority;
    },
    10
);
```
