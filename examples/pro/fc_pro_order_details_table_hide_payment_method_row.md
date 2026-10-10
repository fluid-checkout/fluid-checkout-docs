```php
add_filter( 'fc_pro_order_details_table_hide_payment_method_row',
    /**
     * Show payment method in order details table.
     *
     * @param bool $hide_row Whether to hide the payment method row. Defaults to true.
     * @return bool Filtered value.
     */
    function( $hide_row ) {
        return false;
    },
    10
);
```
