```php
add_filter( 'fc_is_checkout_layout_multistep',
    /**
     * Force multi-step layout for specific conditions.
     *
     * @param string $value Value to filter.
     * @return string Filtered value.
     */
    function( $value ) {
        // Add your conditions here

        return true;
    },
    10
);
```
