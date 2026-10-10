```php
add_action( 'fc_pro_cart_before_main_section_wrapper',
    /**
     * Add breadcrumbs before cart main section.
     */
    function() {
        if ( ! is_cart() ) { return; }

        echo '<div class="cart-breadcrumbs">';
        echo '<a href="' . esc_url( home_url() ) . '">Home</a> &gt; Cart';
        echo '</div>';
    },
    10
);
```
