```php
add_filter( 'fc_pro_override_template_with_theme_file',
    /**
     * Override Fluid Checkout PRO template files with theme versions.
     *
     * @param bool $override Whether a theme template file replaces the Fluid Checkout PRO template. Default false.
     * @param string $template Absolute path of the located template.
     * @param string $template_name Template path relative to the templates directory.
     * @param string $template_path Template directory path.
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
