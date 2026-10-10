```php
add_filter( 'fc_pro_address_book_address_sources_options',
    /**
     * Change the "Enter a new address" label to something else.
     *
     * @param array $options Address source options.
     * @param string $address_type Address type ( billing / shipping ).
     * @param string $address_source Address source identifier.
     * @return array Filtered value.
     */
    function( $options, $address_type, $address_source ) {
        // Change the "Enter a new address" label
        if ( isset( $options['new'] ) ) {
            $options['new'] = __( 'Add New Address', 'your-text-domain' );
        }
        return $options;
    },
    10,
    3
);
```
