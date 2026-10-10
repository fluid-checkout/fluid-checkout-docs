```php
add_filter( 'fc_pro_order_received_wrapper_classes',
    /**
     * Add custom class to order received wrapper.
     *
     * @param string $classes Space-separated CSS classes.
     * @return string Filtered value.
     */
    function( $classes ) {
        return $classes . ' custom-thank-you-page';
    },
    10
);
```
