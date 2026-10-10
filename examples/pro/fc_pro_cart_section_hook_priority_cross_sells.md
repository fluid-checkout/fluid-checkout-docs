```php
add_filter( 'fc_pro_cart_section_hook_priority_cross_sells',
    /**
     * Move cross-sells section to the end.
     *
     * @param mixed $value Filtered value.
     * @return mixed Filtered value.
     */
    function( $value ) {
        // Move to after cart actions
        if ( 'fc_pro_cart_sections' === $value[0] && 30 === $value[2] ) {
            $value[2] = 120;
        }

        return $value;
    },
    10
);
```
