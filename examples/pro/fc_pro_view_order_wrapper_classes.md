```php
add_filter( 'fc_pro_view_order_wrapper_classes',
    /**
     * Add custom class to view order wrapper.
     *
     * @param string $classes CSS classes. Default empty.
     * @return string Filtered value.
     */
    function( $classes ) {
        return $classes . ' custom-view-order-wrapper';
    },
    10
);
```
