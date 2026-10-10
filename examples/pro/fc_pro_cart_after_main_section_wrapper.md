```php
add_action( 'fc_pro_cart_after_main_section_wrapper',
    /**
     * Add custom information.
     */
    function() {
        echo '<div class="custom-info">Custom information</div>';
    },
    10
);
```
