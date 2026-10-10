```php
add_filter( 'fc_pro_cart_section_hook_priority_cross_sells',
    /**
     * Move cross-sells section to the end.
     *
     * @param array $priority Array with 3 elements: array( 'hook_name', 'callback', priority_number )
     * @return array Filtered value.
     */
    function( $priority ) {
        // Move to after cart actions
        if ( 'fc_pro_cart_sections' === $priority[0] && 30 === $priority[2] ) {
            $priority[2] = 120;
        }

        return $priority;
    },
    10
);
```
