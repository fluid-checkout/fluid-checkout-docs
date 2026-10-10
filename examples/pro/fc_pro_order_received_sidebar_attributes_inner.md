```php
add_filter( 'fc_pro_order_received_sidebar_attributes_inner',
    /**
     * Add custom-data to inner sidebar.
     *
     * @param array $attributes Array of HTML attributes.
     * @return array Filtered value.
     */
    function( $attributes ) {
        $attributes['custom-data'] = 'custom-data';
        return $attributes;
    },
    10
);
```
