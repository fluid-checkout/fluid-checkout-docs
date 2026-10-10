```php
add_filter( 'fc_default_locale_field_args',
    /**
     * Modify default locale field arguments.
     *
     * @param array $new_field_args New field args.
     * @return array Filtered value.
     */
    function( $new_field_args ) {
        // Add custom placeholder for address_1
        $new_field_args['address_1']['placeholder'] = __( 'Enter your street address', 'my-theme' );
        return $new_field_args;
    },
    10
);
```
