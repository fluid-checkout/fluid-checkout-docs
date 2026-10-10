```php
add_action( 'fc_checkout_header_widgets',
    /**
     * Add header widgets.
     */
    function() {
        echo '<div class="header-widgets">Header widgets content</div>';
    },
    10
);
```
