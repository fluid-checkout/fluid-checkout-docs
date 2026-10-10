```php
add_filter( 'fc_pro_is_substep_pickup_location_visible',
    /**
     * Force local pickup substep visible.
     *
     * @param bool $visible Whether substep pickup location visible.
     * @return bool Filtered value.
     */
    function( $visible ) {
        return true;
    },
    10
);
```
