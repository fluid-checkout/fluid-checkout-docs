```php
add_filter( 'fc_vat_number_field_args',
    /**
     * Customize VAT number field.
     *
     * @param array $args VAT number field arguments.
     * @return array Filtered value.
     */
    function( $args ) {
        // Change field label
        $args['label'] = __( 'Tax ID Number', 'your-text-domain' );

        // Change field description
        $args['description'] = 'Enter your business tax identification number';

        // Change field priority (display order in form)
        $args['priority'] = 100;

        // Add custom CSS classes
        $args['class'][] = 'custom-vat-field';

        // Make field required
        $args['required'] = true;

        return $args;
    },
    10
);
```
