```php
add_filter( 'fc_pro_cart_section_hook_priority_free_gifts_for_woocommerce',
    /**
     * Change free gifts section priority.
     *
     * @param mixed $value Filtered value.
     * @return mixed Filtered value.
     */
    function( $value ) {
        $value[2] = 20;
        return $value;
    },
    10
);
```
