```php
add_filter( 'fc_pro_order_details_overview_show_date',
    /**
     * Hide order date on view order page.
     *
     * @param bool $show_date Whether to show the order date. Defaults to false.
     * @return bool Filtered value.
     */
    function( $show_date ) {
        if ( function_exists( 'is_view_order_page' ) && is_view_order_page() ) {
            return false;
        }

        return $show_date;
    },
    100
);
```
