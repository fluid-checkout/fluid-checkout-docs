```php
add_filter( 'fc_pro_cart_section_hook_priority_woodmart_free_gifts',
    /**
     * Change Woodmart free gifts section priority.
     *
     * @param array $hook_priority Array containing the hook name, callback callable and priority stored at indexes 0, 1 and 2 respectively.
     * @return array Filtered value.
     */
    function( $hook_priority ) {
        // Force "Before Cart Table" in plugin settings
        $hook_priority[2] = 6;
        return $hook_priority;
    },
    100
);
```
