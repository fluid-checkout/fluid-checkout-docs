```php
add_filter( 'fc_pro_cart_section_hook_priority_shipping',
    /**
     * Move shipping calculator outside order summary.
     *
     * @param array $priority Array with 3 elements: array( 'hook_name', 'callback', priority_number )
     * @return array Filtered value.
     */
    function( $priority ) {
        // Force display on main cart sections (outside order summary)
        if ( 'fc_pro_cart_sections' !== $priority[0] ) {
            $priority[0] = 'fc_pro_cart_sections';
            $priority[2] = 50;
        }

        return $priority;
    },
    10
);
```
