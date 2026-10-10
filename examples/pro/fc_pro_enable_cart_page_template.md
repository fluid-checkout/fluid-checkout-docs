```php
add_filter( 'fc_pro_enable_cart_page_template',
    /**
     * Disable cart page template feature.
     *
     * @param bool $enabled Whether the plugin cart page template is used. Default true.
     * @return bool Filtered value.
     */
    function( $enabled ) {
        return false;
    },
    10
);
```
