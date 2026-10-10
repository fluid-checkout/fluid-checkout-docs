```php
add_filter( 'fc_pro_display_cart_page_title',
    /**
     * Show cart page title.
     *
     * @param bool $title Whether to display cart page title. Default false.
     * @return bool Filtered value.
     */
    function( $title ) {
        return true;
    },
    10
);
```
