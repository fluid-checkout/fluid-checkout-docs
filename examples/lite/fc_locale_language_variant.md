```php
add_filter( 'fc_locale_language_variant',
    /**
     * Customize locale language variant mappings.
     *
     * @param array $value Value to filter.
     * @return array Filtered value.
     */
    function( $value ) {
        // Modify existing mappings
        $value['pt_PT'] = 'pt_BR'; // Force using Brazilian Portuguese for Portugal

        return $value;
    },
    10
);
```
