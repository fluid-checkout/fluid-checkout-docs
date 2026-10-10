```php
add_filter( 'fc_checkout_update_on_visibility_change',
    /**
     * Disable checkout update on visibility change.
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
