```php
add_filter( 'fc_pro_view_order_section_hook_priority_order_summary',
    /**
     * Move order summary from before order items to after order items.
     *
     * @param array $priority Array with 3 elements: array( 'hook_name', 'callback', priority_number )
     * @return array Filtered value.
     */
    function( $priority ) {
        if ( 'woocommerce_view_order' === $priority[0] ) {
            $priority[2] = 43;  // Change to after Customer information
        }

        return $priority;
    },
    10
);
```
