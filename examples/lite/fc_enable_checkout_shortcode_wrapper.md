Priority here is important to be set higher than 10 because maybe_enable_checkout_shortcode_wrapper may also be setting changing the returned value to true.

```php
add_filter( 'fc_enable_checkout_shortcode_wrapper',
    /**
     * Disable checkout shortcode wrapper for custom styling.
     *
     * @param bool $enabled Whether the feature is enabled. Default false.
     * @return bool Filtered value.
     */
    function( $enabled ) {
        return false;
    },
    20
);
```
