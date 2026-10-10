```php
add_filter( 'fc_pro_order_received_sidebar_attributes_inner',
    /**
     * Add custom-data to inner sidebar.
     *
     * @param array $sidebar_attributes_inner HTML attributes for the inner sidebar element.
     * @return array Filtered value.
     */
    function( $sidebar_attributes_inner ) {
        $sidebar_attributes_inner['custom-data'] = 'custom-data';
        return $sidebar_attributes_inner;
    },
    10
);
```
