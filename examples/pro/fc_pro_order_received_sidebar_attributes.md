```php
add_filter( 'fc_pro_order_received_sidebar_attributes',
    /**
     * Add custom data attribute to order received sidebar.
     *
     * @param array $attributes Array of HTML attributes.
     * @return array Filtered value.
     */
    function( $attributes ) {
        $attributes['custom-sidebar'] = 'received';
        return $attributes;
    },
    10
);
```
