```php
add_filter( 'fc_checkout_progress_bar_display_count',
    /**
     * Hide step count in progress bar.
     *
     * @param bool $enabled Whether the feature is enabled. Default true.
     * @return bool Filtered value.
     */
    function( $enabled ) {
        return false;
    },
    10
);
```
