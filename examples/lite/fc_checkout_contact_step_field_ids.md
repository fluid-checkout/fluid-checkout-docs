```php
add_filter( 'fc_checkout_contact_step_field_ids',
    /**
     * Add custom field to contact step.
     *
     * @param array $field_ids Array of field IDs to display in contact step.
     * @return array Filtered value.
     */
    function( $field_ids ) {
        $field_ids[] = 'custom_field';
        return $field_ids;
    },
    10
);
```
