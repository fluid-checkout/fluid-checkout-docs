```php
add_filter( 'fc_add_container_class',
    /**
     * Disable checkout container class for custom styling.
     *
     * @param bool $classes CSS classes. Default true.
     * @return bool Filtered value.
     */
    function( $classes ) {
        return false;
    },
    10
);
```
