```php
add_action( 'fc_pro_cart_footer_widgets_inside_after',
    /**
     * Add content after cart footer widgets.
     */
    function() {
        echo '<div class="footer-widgets-intro">Custom information</div>';
    },
    10
);
```
