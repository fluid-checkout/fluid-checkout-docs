```php
add_filter( 'fc_pro_is_substep_pickup_location_visible',
    /**
     * Force local pickup substep visible.
     *
     * @param bool $is_visible Whether the pickup location substep should be visible.
     * @return bool Filtered value.
     */
    function( $is_visible ) {
        return true;
    },
    10
);
```
