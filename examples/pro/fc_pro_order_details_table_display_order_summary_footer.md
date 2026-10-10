```php
add_filter( 'fc_pro_order_details_table_display_order_summary_footer',
    /**
     * Show the order summary footer from the order details table on view-order pages only.
     *
     * @param bool $display_footer Whether to display the order summary footer. Defaults to true. But depending on the page other filters will change the return here.
     * @return bool Filtered value.
     */
    function( $display_footer ) {
        // Return true for view-order pages, otherwise return the default value
        if ( function_exists( 'is_view_order_page' ) && is_view_order_page() ) {
            return true; // It will appear duplicated, but this is just for demonstration purposes to show how it would be done.
        }
        return $display_footer;
    },
    100
);
```
