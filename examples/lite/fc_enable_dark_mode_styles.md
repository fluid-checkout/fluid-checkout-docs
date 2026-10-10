```php
add_filter( 'fc_enable_dark_mode_styles',
    /**
     * Enable dark mode.
     *
     * @param string $enabled Whether the feature is enabled.
     * @return string Filtered value.
     */
    function( $enabled ) {
        return true;
    },
    10
);
```
