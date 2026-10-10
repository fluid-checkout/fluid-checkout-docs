```php
add_filter( 'fc_pro_order_details_table_hide_payment_method_row',
    /**
     * Show payment method in order details table.
     *
     * @param bool $value Whether order details table hide payment method row. Default true.
     * @return bool Filtered value.
     */
    function( $value ) {
        return false;
    },
    10
);
```
