```php
add_filter( 'fc_customer_persisted_data_clear_fields_order_processed',
    /**
     * Clear custom fields after order is placed.
     *
     * @param mixed $clear_field_keys Clear field keys.
     * @return mixed Filtered value.
     */
    function( $clear_field_keys ) {
        $clear_field_keys[] = 'custom_field';

        return $clear_field_keys;
    },
    10
);
```
