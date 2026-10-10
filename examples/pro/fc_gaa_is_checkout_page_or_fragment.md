```php
add_filter( 'fc_gaa_is_checkout_page_or_fragment',
    /**
     * Always consider custom page as checkout.
     *
     * @param bool $is_checkout Whether the current page should be considered a checkout page.
     * @return bool Filtered value.
     */
    function( $is_checkout ) {
        if ( is_page( 'custom-checkout' ) ) {
            return true;
        }
        return $is_checkout;
    },
    10
);
```
