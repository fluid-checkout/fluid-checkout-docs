```php
add_filter( 'fc_pro_checkout_review_order_table_classes',
    /**
     * Add custom classes to checkout review order table.
     *
     * @param string $classes CSS classes for the table. Defaults to ''.
     * @return string Filtered value.
     */
    function( $classes ) {
        return $classes . ' custom-order-table-class';
    },
    10
);
```
