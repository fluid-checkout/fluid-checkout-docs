```php
add_action( 'fc_pro_cart_header_widgets_inside_after',
    /**
     * Add help link after cart header widgets.
     */
    function() {
        echo '<a href="' . esc_url( home_url( '/help' ) ) . '" class="header-help-link">';
        echo esc_html__( 'Need Help?', 'text-domain' );
        echo '</a>';
    },
    10
);
```
