```php
add_filter( 'fc_checkout_sidebar_attributes',
    /**
     * Add custom attributes to checkout sidebar.
     *
     * @param array $sidebar_attributes Sidebar attributes.
     * @return array Filtered value.
     */
    function( $sidebar_attributes ) {
        $sidebar_attributes['data-custom'] = 'custom-value';
    },
    10
);
```
