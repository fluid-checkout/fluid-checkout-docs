```php
add_filter( 'fc_pro_order_details_table_display_order_summary_footer',
    /**
     * Show the order summary footer from the order details table on view-order pages only.
     *
     * @param bool $display Whether to display order details table display order summary footer. Default true.
     * @return bool Filtered value.
     */
    function( $display ) {
        // Return true for view-order pages, otherwise return the default value
        if ( function_exists( 'is_view_order_page' ) && is_view_order_page() ) {
            return true; // It will appear duplicated, but this is just for demonstration purposes to show how it would be done.
        }
        return $display;
    },
    100
);
```
