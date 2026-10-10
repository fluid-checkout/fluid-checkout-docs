```php
add_action( 'fc_pro_cart_actions',
    /**
     * Add continue shopping link to cart actions.
     */
    function() {
        echo '<a href="' . esc_url( wc_get_page_permalink( 'shop' ) ) . '" class="button">';
        echo esc_html__( 'Continue Shopping', 'text-domain' );
        echo '</a>';
    },
    15
);
```
