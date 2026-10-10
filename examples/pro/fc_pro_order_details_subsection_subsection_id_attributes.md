In `fc_pro_order_details_subsection_{subsection_id}_attributes`, `custom_section` replaces `{subsection_id}`.

```php
add_filter( 'fc_pro_order_details_subsection_custom_section_attributes',
    /**
     * Add custom attributes to subsection.
     *
     * @param array $attributes Array of HTML attributes.
     * @return array Filtered value.
     */
    function( $attributes ) {
        $attributes['data-subsection'] = 'custom';
        return $attributes;
    },
    10
);
```
