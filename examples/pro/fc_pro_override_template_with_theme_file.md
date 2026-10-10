```php
add_filter( 'fc_pro_override_template_with_theme_file',
    /**
     * Override Fluid Checkout PRO template files with theme versions.
     *
     * @param bool $override Whether to override the template.
     * @param string $template Template file path.
     * @param string $template_name Template name.
     * @param string $template_path Template path.
     * @return bool Filtered value.
     */
    function( $override, $template, $template_name, $template_path ) {
        // Change this list with the template files you want to override
        $override_templates_list = array(
            'cart/cart.php',
        );

        if ( in_array( $template_name, $override_templates_list ) ) {
            $override = true;
        }

        return $override;
    },
    10,
    4
);
```
