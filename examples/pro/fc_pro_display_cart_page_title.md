```php
add_filter( 'fc_pro_display_cart_page_title',
    /**
     * Show cart page title.
     *
     * @param bool $display_title Whether to display the cart page title. Defaults to false.
     * @return bool Filtered value.
     */
    function( $display_title ) {
        return true;
    },
    10
);
```
