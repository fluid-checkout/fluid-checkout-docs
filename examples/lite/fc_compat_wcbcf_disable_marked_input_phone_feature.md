```php
add_filter( 'fc_compat_wcbcf_disable_marked_input_phone_feature',
    /**
     * Disable marked input phone feature for WCBCF.
     *
     * @param bool $value Value to filter. Default false.
     * @return bool Filtered value.
     */
    function( $value ) {
        return true;
    },
    10
);
```
