```php
add_filter( 'fc_pro_enable_cart_page_template',
    /**
     * Disable cart page template feature.
     *
     * @param bool $is_enabled Whether the cart page template is enabled. Defaults to true.
     * @return bool Filtered value.
     */
    function( $is_enabled ) {
        return false;
    },
    10
);
```
