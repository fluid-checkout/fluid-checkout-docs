```php
add_filter( 'fc_pro_order_details_overview_show_email',
    /**
     * Show email in order overview.
     *
     * @param bool $value Whether order details overview show email. Default false.
     * @return bool Filtered value.
     */
    function( $value ) {
        return true;
    },
    10
);
```
