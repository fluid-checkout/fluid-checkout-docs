```php
add_filter( 'fc_output_custom_styles',
    /**
     * Add custom CSS to checkout page.
     *
     * @param string $value Value to filter. Default empty string.
     * @return string Filtered value.
     */
    function( $value ) {
        $value .= '
            .fc-custom-class { 
                width: 100%; 
            }
        ';
        return $value;
    },
    10
);
```
