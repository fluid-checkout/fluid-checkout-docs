Currently does not accept class attributes.

```php
add_filter( 'fc_checkout_wrapper_inside_element_custom_attributes',
    /**
     * Add custom attributes to checkout wrapper inside element.
     *
     * @param array $attributes HTML attributes as an associative array. Default empty array.
     * @return array Filtered value.
     */
    function( $attributes ) {
        $attributes['data-custom'] = 'fc-inside-custom-data';
        return $attributes;
    },
    10
);
```
