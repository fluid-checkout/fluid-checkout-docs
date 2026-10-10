```php
add_filter( 'fc_checkout_steps_script_settings',
    /**
     * Add custom JavaScript settings for checkout steps.
     *
     * @param array $settings Settings to output.
     * @return array Filtered value.
     */
    function( $settings ) {
        $settings['customOption'] = 'customValue';
        return $settings;
    },
    10
);
```
