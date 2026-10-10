In `fc_pro_after_cart_section_{section_id}`, `cart_items` replaces `{section_id}`.

```php
add_action( 'fc_pro_after_cart_section_cart_items',
    /**
     * Add promotional banner after cart items section.
     *
     * @param string $section_id Section ID.
     */
    function( $section_id ) {
        echo '<div class="promotional-banner">';
        echo '<p>' . esc_html__( 'Free shipping on orders over $50!', 'text-domain' ) . '</p>';
        echo '</div>';
    },
    10
);
```
