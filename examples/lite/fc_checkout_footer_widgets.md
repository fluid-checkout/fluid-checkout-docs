```php
add_action( 'fc_checkout_footer_widgets',
    /**
     * Add footer widgets.
     */
    function() {
        echo '<div class="footer-widgets">Footer widgets content</div>';
    },
    10
);
```
