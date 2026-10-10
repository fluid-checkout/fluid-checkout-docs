```php
add_filter( 'fc_pro_cart_section_hook_priority_woodmart_free_gifts',
    /**
     * Change Woodmart free gifts section priority.
     *
     * @param mixed $value Filtered value.
     * @return mixed Filtered value.
     */
    function( $value ) {
        // Force "Before Cart Table" in plugin settings
        $value[2] = 6;
        return $value;
    },
    100
);
```
