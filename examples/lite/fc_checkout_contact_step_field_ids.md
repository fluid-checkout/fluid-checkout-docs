```php
add_filter( 'fc_checkout_contact_step_field_ids',
    /**
     * Add custom field to contact step.
     *
     * @param mixed $get_default_contact_step_display_field_ids Get default contact step display field ids.
     * @return mixed Filtered value.
     */
    function( $get_default_contact_step_display_field_ids ) {
        $get_default_contact_step_display_field_ids[] = 'custom_field';
        return $get_default_contact_step_display_field_ids;
    },
    10
);
```
