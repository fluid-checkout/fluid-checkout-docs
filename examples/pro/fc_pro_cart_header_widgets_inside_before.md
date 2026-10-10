```php
add_action( 'fc_pro_cart_header_widgets_inside_before',
    /**
     * Add content before cart header widgets.
     */
    function() {
        echo '<div class="header-widgets-intro">Custom information</div>';
    },
    10
);
```
