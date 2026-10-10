```php
add_filter( 'fc_pro_order_received_sidebar_attributes',
    /**
     * Add custom data attribute to order received sidebar.
     *
     * @param array $sidebar_attributes HTML attributes for the sidebar element.
     * @return array Filtered value.
     */
    function( $sidebar_attributes ) {
        $sidebar_attributes['custom-sidebar'] = 'received';
        return $sidebar_attributes;
    },
    10
);
```
