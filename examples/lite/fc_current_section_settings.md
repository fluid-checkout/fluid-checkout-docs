In `fc_{current_section}_settings`, `tools` replaces `{current_section}`.

```php
add_filter( 'fc_tools_settings',
    /**
     * Add custom title with description on tool settings.
     *
     * @param array $settings Settings to output.
     * @param string $current_section Current settings section slug. An empty string is the dashboard section.
     * @return array Filtered value.
     */
    function( $settings, $current_section ) {
        // Add custom tool setting
        $settings[] = array(
        'title' => __( 'Custom title', 'fluid-checkout' ),
        'type'  => 'title',
        'desc'  => 'Custom Description',
        'id'    => 'fc_checkout_advanced_debug_options',
        );

        return $settings;
    },
    10,
    2
);
```
