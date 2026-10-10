```php
add_filter( 'fc_shipping_phone_field_args',
    /**
     * Customize shipping phone field.
     *
     * @param array $value Value to filter.
     * @return array Filtered value.
     */
    function( $value ) {
        $value['class'] = array( 'form-row-wide', 'custom-class' );
        return $value;
    },
    10
);
```
