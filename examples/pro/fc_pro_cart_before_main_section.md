```php
add_action( 'fc_pro_cart_before_main_section',
    /**
     * Add custom message.
     */
    function() {
        echo '<div class="custom-message">';
        echo 'Custom message';
        echo '</div>';
    },
    10
);
```
