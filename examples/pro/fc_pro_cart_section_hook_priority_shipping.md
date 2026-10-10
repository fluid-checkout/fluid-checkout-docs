```php
add_filter( 'fc_pro_cart_section_hook_priority_shipping',
    /**
     * Move shipping calculator outside order summary.
     *
     * @param mixed $value Filtered value.
     * @return mixed Filtered value.
     */
    function( $value ) {
        // Force display on main cart sections (outside order summary)
        if ( 'fc_pro_cart_sections' !== $value[0] ) {
            $value[0] = 'fc_pro_cart_sections';
            $value[2] = 50;
        }

        return $value;
    },
    10
);
```
