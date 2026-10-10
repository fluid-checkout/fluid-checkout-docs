```php
add_filter( 'fc_pro_order_details_overview_show_date',
    /**
     * Hide order date on view order page.
     *
     * @param bool $value Whether order details overview show date. Default false.
     * @return bool Filtered value.
     */
    function( $value ) {
        if ( function_exists( 'is_view_order_page' ) && is_view_order_page() ) {
            return false;
        }

        return $value;
    },
    100
);
```
