In `fc_pro_cart_section_title_{section_id}`, `cart_items` replaces `{section_id}`.

```php
add_filter( 'fc_pro_cart_section_title_cart_items',
    /**
     * Customize cart items section title.
     *
     * @param string $title The section title.
     * @return string Filtered value.
     */
    function( $title ) {
        return __( 'Your Products', 'text-domain' );
    },
    10
);
```
