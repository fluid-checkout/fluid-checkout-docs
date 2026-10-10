```php
add_action( 'fc_checkout_header_widgets_inside_after',
    /**
     * Add header widgets footer.
     */
    function() {
        echo '<div class="widgets-footer">Widgets loaded</div>';
    },
    10
);
```
