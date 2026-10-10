```php
add_filter( 'fc_pro_order_details_customer_information_show_email',
    /**
     * Hide email on view order page but show on order received.
     *
     * @param bool $show_email Whether to show email. Defaults to true.
     * @return bool Filtered value.
     */
    function( $show_email ) {
        // Hide on view order page (My Account)
        if ( function_exists( 'is_view_order_page' ) && is_view_order_page() ) {
            return false;
        }

        return $show_email;
    },
    10
);
```
