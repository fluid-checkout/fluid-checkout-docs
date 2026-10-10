```php
add_filter( 'fc_checkout_progress_bar_inner_attributes',
    /**
     * Add custom attributes to progress bar.
     *
     * @param array $progress_bar_inner_attributes Progress bar inner attributes.
     * @return array Filtered value.
     */
    function( $progress_bar_inner_attributes ) {
        // Add custom class to existing classes
        $progress_bar_inner_attributes['class'] .= ' custom-progress-bar-inner';
        return $progress_bar_inner_attributes;
    },
    10
);
```
