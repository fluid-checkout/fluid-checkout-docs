```php
add_filter( 'fc_shipping_same_as_billing_display_substep_review_text_notice',
    /**
     * Hide same as billing notice in substep text.
     *
     * @param bool $text Text to display. Default true.
     * @return bool Filtered value.
     */
    function( $text ) {
        return false;
    },
    10
);
```
