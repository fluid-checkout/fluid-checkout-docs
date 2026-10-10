```php
add_filter( 'fc_customer_persisted_data_session_field_keys',
    /**
     * Add custom fields to session persistence.
     *
     * @param mixed $session_field_keys Session field keys.
     * @param array $parsed_posted_data Parsed posted checkout data.
     * @return mixed Filtered value.
     */
    function( $session_field_keys, $parsed_posted_data ) {
        $session_field_keys[] = 'custom_delivery_notes';
        return $session_field_keys;
    },
    10,
    2
);
```
