```php
add_filter( 'fc_css_variables',
    /**
     * Add custom CSS variables.
     *
     * @param array $value Value to filter.
     * @param string $context Context in which the hook runs. Default checkout.
     * @return array Filtered value.
     */
    function( $value, $context ) {
        if ( 'frontend' === $context ) {
            $new_css_variables = array(
                ':root' => array(
                // Change field height
                '--fluidcheckout--field--height' => '50px',
                )
            );

            return FluidCheckout_DesignTemplates::instance()->merge_css_variables( $value, $new_css_variables );
        }
        return $value;
    },
    100,
    2
);
```
