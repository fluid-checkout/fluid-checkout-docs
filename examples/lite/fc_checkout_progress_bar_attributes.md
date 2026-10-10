```php
add_filter( 'fc_checkout_progress_bar_attributes',
    /**
     * Add custom attributes to progress bar.
     *
     * @param array $progress_bar_attributes Progress bar attributes.
     * @return array Filtered value.
     */
    function( $progress_bar_attributes ) {
        // Add custom class to existing classes
        $progress_bar_attributes['class'] .= ' custom-progress-bar';
        return $progress_bar_attributes;
    },
    10
);
```
