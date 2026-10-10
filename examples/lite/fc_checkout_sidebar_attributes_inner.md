```php
add_filter( 'fc_checkout_sidebar_attributes_inner',
    /**
     * Add custom attributes to checkout sidebar inner.
     *
     * @param array $sidebar_attributes_inner Sidebar attributes inner.
     * @return array Filtered value.
     */
    function( $sidebar_attributes_inner ) {
        $sidebar_attributes_inner['data-custom'] = 'custom-value-sidebar-inner';
        return $sidebar_attributes_inner;
    },
    10
);
```
