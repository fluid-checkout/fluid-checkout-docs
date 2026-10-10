```php
add_filter( 'fc_skip_checkout_field_value_from_session_or_posted_data',
    /**
     * Skip getting field values from session for specific fields.
     *
     * @param bool $skip Whether to skip the default behavior. Default false.
     * @param mixed $input Input.
     * @return bool Filtered value.
     */
    function( $skip, $input ) {
        if ( 'billing_first_name' === $input ) {
            return true; // Skip getting phone value from session
        }
        return $skip;
    },
    10,
    2
);
```
