```php
add_filter( 'fc_enable_checkout_page_template',
    /**
     * Disable Fluid Checkout page template.
     *
     * @param bool $enabled Whether the feature is enabled. Default true.
     * @return bool Filtered value.
     */
    function( $enabled ) {
        return false;
    },
    10
);
```
