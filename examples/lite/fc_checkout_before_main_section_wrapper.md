```php
add_action( 'fc_checkout_before_main_section_wrapper',
    /**
     * Add div opening tag.
     */
    function() {
        echo '<div class="custom-before-main">';
    },
    10
);
```
