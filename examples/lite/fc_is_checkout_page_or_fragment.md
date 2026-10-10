```php
add_filter( 'fc_is_checkout_page_or_fragment',
    /**
     * Mark custom page as a checkout page.
     *
     * @param bool $value Value to filter. Default false.
     * @return bool Filtered value.
     */
    function( $value ) {
        if ( is_page( 'custom-checkout' ) ) {
            return true;
        }
        return $value;
    },
    10
);
```
