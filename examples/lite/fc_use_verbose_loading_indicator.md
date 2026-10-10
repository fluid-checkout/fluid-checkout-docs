```php
add_filter( 'fc_use_verbose_loading_indicator',
    /**
     * Enable verbose loading indicators.
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
