```php
add_filter( 'fc_enable_fragments_refresh',
    /**
     * Enable fragments refresh feature.
     *
     * @param bool $enabled Whether the feature is enabled. Default false.
     * @return bool Filtered value.
     */
    function( $enabled ) {
        return true;
    },
    10
);
```
