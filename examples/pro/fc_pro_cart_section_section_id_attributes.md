In `fc_pro_cart_section_{section_id}_attributes`, `cart_items` replaces `{section_id}`.

```php
add_filter( 'fc_pro_cart_section_cart_items_attributes',
    /**
     * Add custom attribute.
     *
     * @param array $attributes Array of HTML attributes.
     * @return array Filtered value.
     */
    function( $attributes ) {
        $attributes['custom-data'] = 'custom-data';
        return $attributes;
    },
    10
);
```
