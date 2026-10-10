In `fc_pro_cart_section_header_{section_id}`, `cart_items` replaces `{section_id}`.

```php
add_action( 'fc_pro_cart_section_header_cart_items',
    /**
     * Add edit link in cart items section header.
     *
     * @param string $section_id The ID of the cart section being rendered.
     */
    function( $section_id ) {
        echo '<div class="promotional-banner">';
        echo '<p>' . esc_html__( 'Free shipping on orders over $50!', 'text-domain' ) . '</p>';
        echo '</div>';
    },
    10
);
```
