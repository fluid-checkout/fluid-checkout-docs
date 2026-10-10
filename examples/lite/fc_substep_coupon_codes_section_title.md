```php
add_filter( 'fc_substep_coupon_codes_section_title',
    /**
     * Customize coupon code substep title.
     *
     * @param string $title Title text.
     * @return string Filtered value.
     */
    function( $title ) {
        return __( 'Discount Code', 'my-theme' );
    },
    10
);
```
