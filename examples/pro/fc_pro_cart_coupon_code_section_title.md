```php
add_filter( 'fc_pro_cart_coupon_code_section_title',
    /**
     * Customize coupon section title.
     *
     * @param string $title The section title. Defaults to “Coupon code”.
     * @return string Filtered value.
     */
    function( $title ) {
        return __( 'Promo Code', 'text-domain' );
    },
    10
);
```
