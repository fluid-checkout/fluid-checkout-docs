```php
add_filter( 'fc_checkout_field_args',
    /**
     * Modify checkout field arguments.
     *
     * @param array $fields_args Fields args.
     * @return array Filtered value.
     */
    function( $fields_args ) {
        // Change billing_first_name field CSS class
        if ( isset( $fields_args['billing_first_name'] ) ) {
            $fields_args['billing_first_name']['class'] = array( 'billing-first-name-class' );
        }

        return $fields_args;
    },
    10
);
```
