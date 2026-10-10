```php
add_action( 'fc_checkout_footer_widgets_inside_before',
    /**
     * Add footer widgets intro.
     */
    function() {
        echo '<div class="footer-widgets-intro">Footer widgets Before</div>';
    },
    10
);
```
