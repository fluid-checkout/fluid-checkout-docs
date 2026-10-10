```php
add_filter( 'fc_is_substep_complete_billing_address_field_keys_skip_list',
    /**
     * Change the list of fields to skip validating to determine whether the sub-step is complete or not.
     *
     * @param mixed $skip_field_keys Parameter value.
     * @return mixed Filtered value.
     */
    function( $skip_field_keys ) {
        $skip_field_keys[] = 'billing_address_2';
        return $skip_field_keys;
    },
    10
);
```
