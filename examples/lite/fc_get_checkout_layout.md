```php
add_filter( 'fc_get_checkout_layout',
    /**
     * Force single-step layout for mobile devices.
     *
     * @param mixed $current_value Current value.
     * @return mixed Filtered value.
     */
    function( $current_value ) {
        if ( wp_is_mobile() ) {
            return 'single-step';
        }
        return $current_value;
    },
    10
);
```
