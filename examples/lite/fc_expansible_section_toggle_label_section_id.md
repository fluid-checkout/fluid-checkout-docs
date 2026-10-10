In `fc_expansible_section_toggle_label_{section_id}`, `coupon_code` replaces `{section_id}`.

```php
add_filter( 'fc_expansible_section_toggle_label_coupon_code',
    /**
     * Customize coupon code toggle label.
     *
     * @param string $value Value to filter.
     * @return string Filtered value.
     */
    function( $value ) {
        return __( 'Have a discount code?', 'my-theme' );
    },
    10
);
```
