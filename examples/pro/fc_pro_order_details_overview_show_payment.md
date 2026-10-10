```php
add_filter( 'fc_pro_order_details_overview_show_payment',
    /**
     * Hide payment method in order overview.
     *
     * @param bool $show_payment Whether to show the payment method. Defaults to true.
     * @return bool Filtered value.
     */
    function( $show_payment ) {
        return false;
    },
    10
);
```
