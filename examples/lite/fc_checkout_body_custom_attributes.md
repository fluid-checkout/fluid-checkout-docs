Currently does not accept class attributes.

```php
add_filter( 'fc_checkout_body_custom_attributes',
    /**
     * Add custom body attributes for theme compatibility.
     *
     * @param array $attributes HTML attributes as an associative array. Default empty array.
     * @return array Filtered value.
     */
    function( $attributes ) {
        // Add other attributes (not class)
        $attributes['data-custom'] = 'custom-value';

        return $attributes;
    },
    10
);
```
