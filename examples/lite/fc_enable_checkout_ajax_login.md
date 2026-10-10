```php
add_filter( 'fc_enable_checkout_ajax_login',
    /**
     * Disable AJAX login at checkout.
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
