```php
add_filter( 'fc_pro_order_details_overview_show_payment',
    /**
     * Hide payment method in order overview.
     *
     * @param bool $value Whether order details overview show payment. Default true.
     * @return bool Filtered value.
     */
    function( $value ) {
        return false;
    },
    10
);
```
