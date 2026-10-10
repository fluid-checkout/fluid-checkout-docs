```php
add_filter( 'fc_checkout_login_fields_unique_id',
    /**
     * Customize login fields unique ID.
     *
     * @param string $unique_id Unique id.
     * @return string Filtered value.
     */
    function( $unique_id ) {
        return '_custom_' . uniqid();
    },
    10
);
```
