```php
add_action( 'fc_checkout_footer_widgets_inside_after',
    /**
     * Add footer widgets footer.
     */
    function() {
        echo '<div class="footer-widgets-footer">Footer widgets loaded</div>';
    },
    10
);
```
