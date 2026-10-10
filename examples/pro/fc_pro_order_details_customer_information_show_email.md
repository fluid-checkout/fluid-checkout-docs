```php
add_filter( 'fc_pro_order_details_customer_information_show_email',
    /**
     * Hide email on view order page but show on order received.
     *
     * @param bool $value Whether order details customer information show email. Default true.
     * @return bool Filtered value.
     */
    function( $value ) {
        // Hide on view order page (My Account)
        if ( function_exists( 'is_view_order_page' ) && is_view_order_page() ) {
            return false;
        }

        return $value;
    },
    10
);
```
