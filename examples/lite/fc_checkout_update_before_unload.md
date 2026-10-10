```php
add_filter( 'fc_checkout_update_before_unload',
    /**
     * Disable checkout update before page unload.
     *
     * @param string $value Value to filter. Default yes.
     * @return string Filtered value.
     */
    function( $value ) {
        return 'no';
    },
    10
);
```
