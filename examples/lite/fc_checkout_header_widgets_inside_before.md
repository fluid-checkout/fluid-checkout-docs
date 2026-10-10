```php
add_action( 'fc_checkout_header_widgets_inside_before',
    /**
     * Add header widgets intro.
     */
    function() {
        echo '<div class="widgets-intro">Header widgets</div>';
    },
    10
);
```
