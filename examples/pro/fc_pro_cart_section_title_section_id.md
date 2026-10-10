In `fc_pro_cart_section_title_{section_id}`, `cart_items` replaces `{section_id}`.

```php
add_filter( 'fc_pro_cart_section_title_cart_items',
    /**
     * Customize cart items section title.
     *
     * @param string $section_title The section title.
     * @return string Filtered value.
     */
    function( $section_title ) {
        return __( 'Your Products', 'text-domain' );
    },
    10
);
```
