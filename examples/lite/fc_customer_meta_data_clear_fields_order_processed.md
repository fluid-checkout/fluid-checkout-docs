```php
add_filter( 'fc_customer_meta_data_clear_fields_order_processed',
    /**
     * Clear custom customer meta after order.
     *
     * @param array $value Value to filter. Default empty array.
     * @return array Filtered value.
     */
    function( $value ) {
        $value[] = '_custom_temporary_preference';
        return $value;
    },
    10
);
```
