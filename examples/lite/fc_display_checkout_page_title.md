```php
add_filter( 'fc_display_checkout_page_title',
    /**
     * Show checkout page title.
     *
     * @param bool $title Title text. Default false.
     * @return bool Filtered value.
     */
    function( $title ) {
        return true;
    },
    10
);
```
