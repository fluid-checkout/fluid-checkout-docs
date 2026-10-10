```php
add_filter( 'fc_is_cart_page_or_fragment',
    /**
     * Mark custom page as cart page.
     *
     * @param bool $value Value to filter. Default false.
     * @return bool Filtered value.
     */
    function( $value ) {
        if ( is_page( 'custom-cart' ) ) {
            return true;
        }
        return $value;
    },
    10
);
```
