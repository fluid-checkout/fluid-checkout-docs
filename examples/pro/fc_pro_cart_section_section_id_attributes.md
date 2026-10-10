In `fc_pro_cart_section_{section_id}_attributes`, `cart_items` replaces `{section_id}`.

```php
add_filter( 'fc_pro_cart_section_cart_items_attributes',
    /**
     * Add custom attribute.
     *
     * @param array $additional_attributes HTML attributes.
     * @return array Filtered value.
     */
    function( $additional_attributes ) {
        $additional_attributes['custom-data'] = 'custom-data';
        return $additional_attributes;
    },
    10
);
```
