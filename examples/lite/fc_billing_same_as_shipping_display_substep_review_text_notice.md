```php
add_filter( 'fc_billing_same_as_shipping_display_substep_review_text_notice',
    /**
     * Hide same as shipping notice in billing substep text.
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
