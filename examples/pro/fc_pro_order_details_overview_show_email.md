```php
add_filter( 'fc_pro_order_details_overview_show_email',
    /**
     * Show email in order overview.
     *
     * @param bool $show_email Whether to show the email. Defaults to false.
     * @return bool Filtered value.
     */
    function( $show_email ) {
        return true;
    },
    10
);
```
