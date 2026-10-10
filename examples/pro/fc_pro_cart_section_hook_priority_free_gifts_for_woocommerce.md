```php
add_filter( 'fc_pro_cart_section_hook_priority_free_gifts_for_woocommerce',
    /**
     * Change free gifts section priority.
     *
     * @param array $priority Array containing hook name and priority.
     * @return array Filtered value.
     */
    function( $priority ) {
        $priority[2] = 20;
        return $priority;
    },
    10
);
```
