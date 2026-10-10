```php
add_filter( 'fc_is_substep_complete_billing_address_field_keys_skip_list',
    /**
     * Change the list of fields to skip validating to determine whether the sub-step is complete or not.
     *
     * @param mixed $get_contact_step_display_field_ids Get contact step display field ids.
     * @return mixed Filtered value.
     */
    function( $get_contact_step_display_field_ids ) {
        $get_contact_step_display_field_ids[] = 'billing_address_2';
        return $get_contact_step_display_field_ids;
    },
    10
);
```
