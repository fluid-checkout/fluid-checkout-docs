```php
add_filter( 'fc_substep_coupon_codes_text',
    /**
     * Customize coupon codes substep text.
     *
     * @param string $html HTML markup.
     * @return string Filtered value.
     */
    function( $html ) {
        return __( 'Applied discount codes will be shown here.', 'my-theme' );
    },
    10
);
```
