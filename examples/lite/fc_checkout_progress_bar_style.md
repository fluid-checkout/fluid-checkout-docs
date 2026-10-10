```php
add_filter( 'fc_checkout_progress_bar_style',
    /**
     * Force breadcrumbs style.
     *
     * @param string $progress_bar_style Progress bar style slug. bars or breadcrumbs.
     * @return string Filtered value.
     */
    function( $progress_bar_style ) {
        return 'breadcrumbs';
    },
    10
);
```
