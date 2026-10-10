```php
add_filter( 'fc_checkout_column_layout',
    /**
     * Always use the one-column checkout layout.
     *
     * @param mixed $current_value Current value.
     * @return mixed Filtered value.
     */
    function( $current_value ) {
        return 'one_column';
    },
    10
);
```
